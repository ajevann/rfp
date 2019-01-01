var express = require('express');
var app = express();
var path = require('path');

// Running locally, remove the base html tag that would mess up the loading of static files. gh-pages needs it though
var baseRegex = /\<base href=\"\/rfp\/public\/">/g;
var fs = require('fs');
fs.readFile(path.resolve(__dirname + '/index.html'), 'utf8', function (err, data) {
  fs.writeFile(path.resolve(__dirname + '/indexLocalHost.html'), data.replace(baseRegex, ''), 'utf8', function (err) {});
});

// Serve static files
app.use(express.static(__dirname + '/public'));

// Provide entry point
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/indexLocalHost.html'));
});

app.listen(8080);