//specifies which routes will be handled by which controllers

var mongoose = require('mongoose');
var Otter = mongoose.model('Otter'); // retrieving this Schema from our Models, named Quote
var otters = require('../controllers/otters.js');
var multer = require('multer');

module.exports = function(app) {

  app.get('/', function (req,res) {
    otters.show(req, res);
    // res.render('index');
  });
  app.get('/new', function (req,res) {
    res.render('new');
  });
  app.get('/otters/:id', function(req, res) {
    otters.displayOne(req, res);
  });

  app.post('/add_otter', multer({ dest: './client/static/images/'}).single('photo'), function(req,res) {
    //console.log("post data: ", req);
    otters.create(req,res);
  });

  app.get('/edit/:id', function(req, res) {
    otters.edit(req, res);
  });

  app.post('/edit_otter/:id', multer({ dest: './client/static/images/'}).single('photo'), function (req, res) {
    otters.edit_otter(req, res);
  })

  app.get('/destroy/:id', function(req, res) {
    otters.destroy(req, res);
  });

  app.get('/like/:id', function(req, res) {
    otters.likes(req,res);

  });

}
