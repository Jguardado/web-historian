var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

// exports.handleRequest = function (req, res) {
  
//   if (req.method === "GET"){
//   //console.log('\n \n \n REQUEST URL\n \n \n', req.url);
//     //I think we need to add conditionals for if the request is getting our index or an archived file. How do we determine what the get requests is requesting for?  
    
//     if (req.url === "/www.google.com") {
//       fs.readFile(archive.paths.archivedSites + "/www.google.com", function (err, siteContent) {
//         helper.serveAssets(res, siteContent); 
//       }
//     }
    
//     fs.readFile(archive.paths.homepage, function (err, html) {
//       // if (err) {
//       //   throw err;
//       // }       
//       helper.serveAssets(res, html);
//     });
//   }
// }


exports.handleRequest = function (req, res) {
  
  if (req.method === "GET"){
    console.log('\n \n \n REQUEST URL\n \n \n ', req.url);

    //if (req.url !== "/"){
      var reqUrl = req.url;
      var isPresent = 'not set';

      // console.log( fs.access(archive.paths.archivedSites + reqUrl, fs.R_OK, function (err) {
      //    console.log(err ? false : true);
      // }));

      fs.access(archive.paths.archivedSites + reqUrl, fs.R_OK, function (err) {
        err ? isPresent = false : isPresent = true;
        
        if (isPresent){

          console.log('this is the current url: ', reqUrl);
          if (reqUrl === "/"){
            fs.readFile(archive.paths.homepage, function (err, html) {
              helper.serveAssets(res, html);
            });
          } else {
            //console.log('ITS NOT LOOKING FOR THE HTML');
            //console.log(reqUrl);
            fs.readFile(archive.paths.archivedSites + reqUrl, function(err, siteContent){
              helper.serveAssets(res, siteContent);
            })
          }
        } else {
          console.log('ARGLE BARGLE SHOULD BE HERE!!!!!!', reqUrl);
          res.writeHead(404, headers);
          res.end();
          
        }
      });

      //console.log('this is the boolean:', isPresent);

  //  }

    // fs.readFile(archive.paths.homepage, function (err, html) {
    //   // if (err) {
    //   //   throw err;
    //   // }       
    //   helper.serveAssets(res, html);
    // });


  }
}


/* Commented out because the current test isn't using a POST request

  if(req.method === "POST"){

    //console.log('\n \n \n POST REQUEST OBJECT!!\n \n \n ', req)

    //console.log(JSON.parse(req));//this isnt working, niether is parse.
    //Prior to writing the fs.writeFile function we need to somehow parse/stringify the url being passed in. This is represented by my string below.
    

    fs.writeFile(archive.paths.list, ('this is the url') , function (err, url){
      res.writeHead(302, headers);
    });
    

    //attempting to read thw file once it has been written to the txt...
    
    // fs.readFile(archive.paths.archivedSites, function (err, html){
    //   helper.serveAssets( res, html);
    // })

*/





  

