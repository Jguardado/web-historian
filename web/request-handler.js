var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
var fs = require('fs');
//var html = require('./public/index.html');
// require more modules/folders here!



// html.response.on('submit', function(info){
//   console.log(info);
// });

exports.handleRequest = function (req, res) {
  //debugger;
  if (req.method === "GET"){
   // console.log('\n \n \n REQUEST URL\n \n \n ', req.url);

      var reqUrl = req.url;
      var isPresent = 'not set';

      fs.access(archive.paths.archivedSites + reqUrl, fs.R_OK, function (err) {
        err ? isPresent = false : isPresent = true;
        
        if (isPresent){

          // fs.writeFile("archives/sites.txt", "Hey there!", function(err) {
          //   if(err) {
          //     return console.log(err);
          //   }
          //   console.log("The file was saved!");
          // }); 


        //  console.log('this is the current url: ', reqUrl);
          if (reqUrl === "/"){
            fs.readFile(archive.paths.homepage, function (err, html) {
              helper.serveAssets(res, html);
            });
          } else {
            fs.readFile(archive.paths.archivedSites + reqUrl, function(err, siteContent){
              helper.serveAssets(res, siteContent);
            });
          }
        } else {
          //console.log('ARGLE BARGLE SHOULD BE HERE!!!!!!', reqUrl);
          res.writeHead(404, headers);
          res.end();
          
        }
      });
  }





  if(req.method === "POST"){
    req.on('data', function(chunk){

      console.log(chunk.toString());
      var str = chunk.toString();
      var gold = str.split('=');
      archive.addUrlToList(gold[1], function(){
        res.writeHead(302, headers);
        res.end('Added');
    })
      
    })
  }
}



  

