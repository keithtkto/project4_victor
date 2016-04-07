var User = require("../models/user");
var regimensCtrl = require('./regimens');



var CronJob = require('cron').CronJob;
var cj = new CronJob('*/10 * * * * *', function() {
  return regimensCtrl.test()
  console.log("start cron")

}, function(){
  console.log("finish")
}, true, 'America/Los_Angeles');

cj.start()


function addNewTask(){
  console.log("add new task")
  console.log(User)
   User.findById("570534563bac3bd9c4bef933").exec()
  .then(function(user){
    console.log("user", user)
  });
}


