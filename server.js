
//the home base of the project:
        // - where we require the routes and the mongoose config
        // - crates the express application, loads config into it and listen


var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

//var uploading = multer({
//  dest: __dirname + '../static/images/',
//})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./client/static")));

// This sets the location where express will look for the ejs views
app.set('views',path.join(__dirname, './client/views'));
// set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
var routes = require("./server/config/routes.js")(app);

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
