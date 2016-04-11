var debug   = require("debug")("task:schedule_regimen");
var _       = require("lodash");

require("../config/database");


var User = require("../models/user");



// Twilio Credentials
var accountSid = "ACba9fab5169877615541990468f7fdfa7";
var authToken  = "e15825c04e4b2f58df5d8d0f4521c7d5" //old
// var authToken = process.env.TWILIO_TOKEN;



//require the Twilio module and create a REST client
var client = require("twilio")(accountSid, authToken);

module.exports.run = function(){

  return User
    .dataForSMS()
    .then(function(reminder4SMS){
      //using lodash for each to
      _.forEach(reminder4SMS, function(array){
        var user = array[0].parent().parent()
        var smsAlerts = array.length
        if (user.firstName == "testinguser"){
          sendSMS(user, smsAlerts)
        }
        // if (user.cellNumber) {
        // sendSMS(user, smsAlerts) //uncomment for normal situation
        // }
      });
    });
}

function sendSMS(user, r4SMS){
  var textBody = `Hi, ${user.firstName}. You have ${r4SMS} medication reminder${r4SMS = 1 ? "" : "s"}. Please log in to your account for more infomation.`
  client.messages.create({
    // to: user.cellNumber,
    to: user.cellNumber,
    from: "+14242034815",
    body: textBody,
  }, function(err, message) {
    console.log(err, message);
  });
}
