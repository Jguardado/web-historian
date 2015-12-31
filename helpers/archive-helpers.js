var fs = require('fs');
var path = require('path');
var _ = require('underscore');
//var helper = require('http-helper');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  homepage: path.join(__dirname, '../web/public/index.html'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function (err, data){
    var arr = data.split('\n');

    callback(arr);

  });

  
  

};

exports.isUrlInList = function(url, callback){
  fs.access(exports.paths.archivedSites + url, fs.F_OK, callback);
};

exports.addUrlToList = function(url, callback){
  fs.writeFile(exports.paths.list, url, 'utf8', callback);
};

exports.isUrlArchived = function(url, callback){
  fs.access(exports.paths.archivedSites + url, 'utf8', callback);
};

exports.downloadUrls = function(array){
  for (var i = 0; i < array.length; i++) {
    console.log('EXPORTING INTO THIS DIRECTORY', exports.paths.archivedSites + array[i]); 
    fs.writeFile(exports.paths.archivedSites + '/' + array[i], 'utf8');
    //fs.writeFile(exports.paths.archivedSites, "www.google.com");

  };
};
