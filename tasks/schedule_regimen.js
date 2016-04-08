var debug   = require('debug')('task:schedule_regimen');
var getTime = require('./get_time');

require('../config/database');

var User = require('../models/user');

module.exports.run = function(time) {
  var upcomingTime = getTime().upcoming;
  debug("Upcoming time:", upcomingTime);

  return User
    .getUpcomingRegimens(upcomingTime)
    .then(function(regimens) {
      debug("Upcoming Regimens:", regimens);

      // Create a new history for each!
      regimens.forEach(function(regimen, i) {
        var scheduledTime = convertScheduledTimetoDateTime(upcomingTime);
        var nameDosage    = regimen.name + "  " + regimen.dosage
        regimen.history.push({alert: regimen.reminder, timeScheduled: scheduledTime, nameDosage: nameDosage });
        regimen.parent().save();
        console.log("regimen saved", regimen)
      });
    })
};




function convertScheduledTimetoDateTime(upcomingTime){
  console.log("upcoming", upcomingTime)
  var scheduledTime = new Date();
  scheduledTime.setHours(upcomingTime.hour);
  scheduledTime.setMinutes(upcomingTime.minute);
  scheduledTime.setSeconds(0);
  return scheduledTime;

}
