var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers');

// require more modules/folders here!
var getSite = function (request, response) {
  var urlPath = url.parse(request.url).pathname;

  if (urlPath === '/') {
    urlPath = '/index.hmtl';
  }

  helpers.serveAssets(response, urlPath, function () {
    if (urlPath[0] === '/') {
      urlPath = urlPath.slice(1);
    }

    archive.isUrlInList(urlPath, function (found) {
      if (found) {
        helpers.sendRedirect(response, '/loading.html');
      } else {
        helpers.send404(response);
      }
    });
  });
};

var saveSite = function (request, response) {
  helpers.collectData(request, function (data) {
    archive.isUrlInList(url, function (found) {
      if (found) {
        archive.isUrlArchived(url, function (exists) {
          if (exists) {
            helpers.sendRedirect(response, '/' + url);
          } else {
            helpers.sendRedirect(response, '/loading.html');
          }

        });
      } else {
        archive.addUrlToList(url, function () {
          helpers.sendRedirect(response, '/loading.html');
        });
      }
    });
  });
};

var actions = {
  GET: getSite,
  POST: saveSite,
};

// html.response.on('submit', function(info){
//   console.log(info);
// });

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }
};
