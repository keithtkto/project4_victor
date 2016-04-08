var debug   = require('debug')('task:schedule_regimen');
var getTime = require('./get_time');

require('../config/database');

var User = require('../models/user');

module.exports.run = function() {

  return User
    .closeYesterdayScheduleRegimens()
    .then(function(historyList){
      debug(historyList)

      historyList.forEach(function(item) {
        item.missed = true
        item.parent().parent().save()
      })
      console.log(historyList)
    });
};
