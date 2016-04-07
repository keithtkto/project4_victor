var User = require("../models/user");
var CronJob = require('cron').CronJob;


module.exports = {

  test: test
};



var cj = new CronJob('*/10 * * * * *', function() {
  console.log("start cron")
  test()
}, null, true, 'America/Los_Angeles');

cj.start()

function test(req, res, next) {
  console.log("XYXsdfsYXYXYXYXYYXYXYYXY")
  User.find().exec()
  .then(function(allUsers){
      // console.log(allUsers)
    allUsers.forEach(function(user){
      user.regimen.forEach(function(task){
        console.log(task)

      })

      // user.history.push({name: "USER FOR ALL", comment: "USER FOR ALLUSER FOR ALLUSER FOR ALLUSER FOR ALLUSER FOR ALL" })
      console.log("cron job doing server stuff")
      user.save()
    })
  });
};
