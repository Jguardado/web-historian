var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //console.log("\n\n\n\n\n", req.method);

  if (req.method === "GET"){
  //console.log(res);

  //console.log('PATHS STRING:', archive.paths.siteAssets + "/index.html");
  

  console.log(res);
  fs.readFile("archive.paths.siteAssets + 'index.html' ", function (err, html) {
    if (err) {
        throw err; 
    }       
  res.writeHead(200, helper.headers);
  res.write(html);
  res.end();



  // res.end(fs.readFile('archive.paths.siteAssets + "/index.html" '));

  //   http.createServer(function(request, response) {  
  //       response.writeHeader(200, {"Content-Type": "text/html"});  
  //       response.write(html);  
  //       response.end();  
  //   }).listen(8000);
});

//   fs.readFile('/etc/passwd', function (err, data) {
//   if (err) throw err;
//   console.log(data);
// });

  }
  
    res.end(archive.paths.list);
  
};
