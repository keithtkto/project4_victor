var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    _        = require('lodash');

var historySchema = new mongoose.Schema({
  createdAt:      {type: Date, default: Date.now},
  timeScheduled:  Date,
  isTaken:        {type: Boolean, default: false},
  comment:        String,
  missed:         {type: Boolean, default: false},
  alert:          Boolean,
  nameDosage:     String
});


var regimenSchema = new mongoose.Schema({
  createdAt:      {type: Date, default: Date.now},
  name:           {type: String, required: true},
  dosage:         String,
  quantity:       Number,
  direction:      String,
  description:    String,
  reminder:       {type: Boolean, default: true},
  history:        [historySchema],
  hour:           Number,
  minute:         {type: Number, default: 0},
  idCode:         String
  //, active: Boolean default: true
});

regimenSchema.methods.isAt = function(time) {
  return this.hour === time.hour && this.minute === time.minute;
}



var userSchema = new mongoose.Schema({
  createdAt:     {type: Date, default: Date.now},
  email:          { type: String, required: true, unique: true },
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  cellNumber:     { type: String },
  dob:            { type: String },
  zipCode:        { type: String },
  regimen:        [regimenSchema]
});


userSchema.statics.getUpcomingRegimens = function(upcomingTime) {
  return this
    .find({}).exec()
    .then(returnAllRegimen)
    .then(function(regimens) {
      // Filter for upcoming time matching
      return regimens.filter(function(regimen) {
        return regimen.isAt(upcomingTime);
      });
    });
}


userSchema.statics.dataForSMS = function(){
  return this
    .find({}).exec()
    .then(returnAllRegimen)
    .then(function(regimens) {
      // Filter for reminders (true ? false)!
      return _.filter(regimens, "reminder");
    })
    .then(returnAllHistory)
    .then(function(history){
      //filter out record has already taken or not from today
      history = history.filter(function(record){
        return !record.timeTaken && !record.missed
      })
      //group history into by user._id to {user._id: [array of history]}
      var groupedHistory = _.groupBy(history, function(obj){
          return obj.parent().parent()._id
      });
      return groupedHistory
    });
}

userSchema.statics.closeYesterdayScheduleRegimens = function(){
  return this
    .find({}).exec()
    .then(returnAllRegimen)
    .then(returnAllHistory) //return all history
}


userSchema.statics.findRecord2Edit = function(){
  return this
    .find({}).exec()
    .then(returnAllRegimen)
    .then(returnAllHistory)
}


  // Get all of the regimens in the db.
  //   - Get all users, then pull out just the regmin lists,
  //   - take all the regimen lists and merge…
function returnAllRegimen(users) {
  return _.flatten(_.map(users, 'regimen'))
}
  // from the formated all regimen in array, pick out all history within
  // merge into history list
function returnAllHistory(regimens){
  return _.flatten(_.map(regimens, 'history'))
}


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
