const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/app'));
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/app/index.html'));
});

// Start the app by listening on the default Heroku port
