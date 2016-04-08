var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    _        = require('lodash');

var historySchema = new mongoose.Schema({
  createdAt:      {type: Date, default: Date.now},
  timeScheduled:  {type: Date, default: Date.now},
  timeTaken:      Date,
  comment:        String,
  missed:         {type: Boolean, default: false},
  alert:          Boolean
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
    .then(function(users) {
      // Get all of the regimens in the db.
      //   - Get all users, then pull out just the regmin lists,
      //   - take all the regimen lists and merge…
      return _.flatten(_.map(users, 'regimen'))
    })
    // .then(function(regimens) {
    //   // Filter for reminders!
    //   return _.filter(regimens, 'reminder');
    // })
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
    .then(function(users) {
      return _.flatten(_.map(users, 'regimen'))
    })
    .then(function(regimens) {

      // Filter for reminders!
      return _.filter(regimens, 'reminder');
    })
    .then(function(regimensRequireAlert){
      return _.flatten(_.map(regimensRequireAlert, 'history'))
    })
    .then(function(history){
      history = history.filter(function(record){
        return !record.timeTaken && !record.missed
      })

      var groupedHistory = _.groupBy(history, function(obj){
        debug("each regimen", obj.parent().parent().firstName)
          return obj.parent().parent()._id
      })

      // debug("new object", groupedHistory)
      return groupedHistory
    })
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
