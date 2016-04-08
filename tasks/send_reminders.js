var debug   = require("debug")("task:schedule_regimen");
var _       = require("lodash");

require("../config/database");


var User = require("../models/user");



// Twilio Credentials
var accountSid = "ACba9fab5169877615541990468f7fdfa7";
var authToken  = "e15825c04e4b2f58df5d8d0f4521c7d5"
// var authToken  = process.env.TWILIO_TOKEN;


//require the Twilio module and create a REST client
var client = require("twilio")(accountSid, authToken);






module.exports.run = function(){

  debug("send reminder function running")
  debug("Grabbing Users")

  return User
    .dataForSMS()
    .then(function(reminder4SMS){

      _.forEach(reminder4SMS, function(array){
        var user = array[0].parent().parent()
        var smsAlerts = array.length
        if (user.firstName == "Kareem"){
          sendSMS(user, smsAlerts)
        }
      });
    });
}



        // if (idx === 0) {
        //   debug("sms");
        // sendSMS(user, reminder4SMS);
        // }


function sendSMS(user, r4SMS){
  var textBody = `Hi, ${user.firstName}. You have ${r4SMS} medication reminder. Please log in to your account for more infomation.`
  client.messages.create({
    // to: user.cellNumber,
    to: user.cellNumber,
    from: "+14242034815",
    body: textBody,
  }, function(err, message) {
    console.log(err, message);
  });
}
