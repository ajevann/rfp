var express = require('express');
var app = express();
var path = require('path');

// Serve static files
app.use(express.static(__dirname + '/public'));

// Provide entry point
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.listen(8080);