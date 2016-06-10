//controls all the server-side logic and is called upon by the routes
//interacts with preloaded models
//sends response to client

var mongoose = require('mongoose');
var Otter = mongoose.model('Otter');
require('mongoose-type-url');
require('multer');
var fs = require('fs');

module.exports = {
  show: function(req, res) {
        Otter.find({}, function(err, otters) {
          // if(err) {
          //   console.log("error in find: ", err);
          //   res.render('index', {message: "there was an error"});
          // } else {
            //console.log("otters", otters[0].id);
            res.render('index', {otters: otters});
          // }
        });
  },

  displayOne: function(req, res) {
      //console.log("inside displayOne", req.params.id);
      var id = req.params.id;
      Otter.findOne({'_id' : id}, function(err, otter){
        res.render('display_otter', {otter: otter});
      });
  },
  create: function(req, res) {
    console.log("post data", req.file);
    var otter = new Otter({
                    name: req.body.name,
                    photo: req.file.filename + '.jpg',
                    likes:  0
                });
    fs.rename(req.file.path, req.file.path + '.jpg', function (err) {
    if (err) throw err;
      console.log('renamed complete');
    });
    otter.save(function(err) {
      if(err) {
      console.log(err);
      console.log('something went wrong');
      } else {
        console.log('successfully added an otter!');
        }
          res.redirect('/new');
    });
   },

   edit: function(req, res) {
     var id = req.params.id;
     //console.log(id);
     Otter.findOne({'_id' : id}, function(err, otter){
       res.render('edit', {otter: otter});
     });
   },

   edit_otter: function(req,res) {
     //console.log("new name", req.body.name);
     Otter.update({_id: req.params.id}, {name:req.body.name}, function (err, otter){
       console.log("error on edit", err);
       res.redirect('/');
    })
   },

   destroy: function(req, res) {
     //console.log("destroy id", req.params.id);
     Otter.remove({_id: req.params.id}, function (err, otter) {
       res.redirect('/');
     });
   },

   likes:  function(req, res) {

    Otter.update({_id: req.params.id}, {$inc: {likes: 1}}, function(err, doc){
        if(err) {
        console.log(doc);
        console.log(err);
          } else {
            console.log(doc);
          }
        });
            //  res.redirect('/');
           }

}
