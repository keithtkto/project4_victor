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
      regimens.forEach(function(regimen) {
        regimen.history.push({alert: regimen.reminder});
        regimen.parent().save();
        console.log("regimen saved", regimen)
      });
    })
};
