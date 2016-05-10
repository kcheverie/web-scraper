var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

request('http://substack.net/images/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var permissions =[]
    var url =[]
    var extension =[]

    var results = []

    $('tr td:first-child').each(function(i, element){
      permissions.push($(this).text());
    });
    $('tr td:last-child a').each(function(i, element){
      var filename = $(this);
      url.push("http://substack.net" + filename.attr('href'));
    });
    $('tr td:last-child a').each(function(i, element){
      var filename = $(this);
      extension.push(filename.text().split(".").pop());
    });

    var results = permissions.map(function (e, i) {
      return ('\n' + permissions[i] + ',' + url[i] + ',' + extension[i]);    
    });

    for (i = 0; i < results.length; i++) { 
      result = results[i];
      fs.appendFile('images.csv', result);  
    }
  }
});

