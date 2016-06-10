//specifies the schema to be loaded by mongoose
//it is required by mongoose.js, which is required by server.js, so no need to require this in server.js

var mongoose = require('mongoose');
require('mongoose-type-url');

var OtterSchema = new mongoose.Schema({
  name: String,
  photo: String,
  //photo: {type: mongoose.SchemaTypes.Url},
  likes: Number,
  created_at: {type: Date, default: Date.now}
});

var Otter = mongoose.model('Otter', OtterSchema);// setting this Schema in our Models as 'Otter'

//OtterSchema.path('name').required(true, 'Name cannot be blank');
//OtterSchema.path('photo').required(true, 'Photo cannot be blank');
