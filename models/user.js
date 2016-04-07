var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');


// var taskSchema = new mongoose.Schema({
//   name:           {type: String, required: true},
//   dosage:         String,
//   quantity:       Number,
//   time_scheduled: Date,
//   time_taken:     Date,
//   completed:      {type: Boolean, default: false},
//   comment:        String
// });

var historySchema = new mongoose.Schema({
  createdAt:      {type: Date, default: Date.now},
  // task:           [taskSchema]
  drugName:           String,
  dosage:         String,
  quantity:       Number,
  time_scheduled: Date,
  time_taken:     Date,
  completed:      {type: Boolean, default: false},
  comment:        String
});


var regimenSchema = new mongoose.Schema({
  createdAt:      {type: Date, default: Date.now},
  name:           {type: String, required: true},
  dosage:         String,
  quantity:       Number,
  direction:      String,
  description:    String,
  reminder:       {type: Boolean, default: true},
  hour:           Number,
  minute:         {type: Number, default: 00},
  idCode:         String
});

var userSchema = new mongoose.Schema({
  createdAt:     {type: Date, default: Date.now},
  email:          { type: String, required: true, unique: true },
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  cellNumber:     { type: String },
  dob:            { type: String },
  zipCode:        { type: String },
  regimen:        [regimenSchema],
  history:        [historySchema]
});

// Add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'));

// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
