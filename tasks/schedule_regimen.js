var debug = require('debug')('task:schedule_regimen');

require('../config/database');

var User = require("../models/user");

module.exports = {
  run: run
};

function run(req, res, next) {
  // debug("SCHEDULING REGIMEN!")

  return User
    .find({}).exec()
    .then(function(users) {
      debug("Users:", users);
    });

  // User.find().exec()
  // .then(function(allUsers){
  //   var dateTime  = new Date()
  //   var hourNow   = dateTime.getHours()
  //   var minuteNow = dateTime.getMinutes()

  //   console.log(hourNow, minuteNow)

  //   allUsers.forEach(function(user){
  //     user.regimen.forEach(function(task){
  //       // console.log(task)

  //       var currentTime = new Date();
  //       console.log("current Time", currentTime)

  //       var taskTime    = new Date();
  //       taskTime.setHours(task.hour)
  //       taskTime.setMinutes(task.minute)


  //       var taskTime15mAgo = currentTime - (60000 * 15)

  //       console.log("taskTime", taskTime)
  //       console.log("15min ago", taskTime15mAgo)
  //       if (currentTime >= taskTime && currentTime <= taskTime15mAgo ) {
  //         console.log("between now and 15min in the past!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(((()())&*%^%%^$#TR^*%")
  //         console.log(task)
  //       }
  //     // user.history.push({name: "USER FOR ALL", comment: "USER FOR ALLUSER FOR ALLUSER FOR ALLUSER FOR ALLUSER FOR ALL" })



  //     })

  //     console.log("cron job doing server stuff")
  //     user.save()
  //   })
  // });
};





//helper function to sort time


function createDatTaskOrNaw(){}



