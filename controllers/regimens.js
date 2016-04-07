var User = require("../models/user");

var CronJob = require('cron').CronJob;


module.exports = {
  index: index,
  create:create,
  destroy: destroy,
  update: update,
  // test: test
};

// var cj = new CronJob('*/10 * * * * *', function() {
//   console.log("start cron")
//   test()
// }, null, true, 'America/Los_Angeles');

// cj.start()

// function test(req, res, next) {
//   console.log("XYXsdfsYXYXYXYXYYXYXYYXY")
//   User.findById("570534563bac3bd9c4bef933").exec()
//   .then(function(user){
//     user.history.push({drugName: "TESTING CRON", comment: "TESTTESTTESTTESTTESTTESTTESTTEST in cron.js" })
//     console.log(user)
//     user.save()
//   });
// };



function index(req, res, next) {
  User.findById(req.decoded._id).exec()
  .then(function(user){
    res.send(user.regimen);
  });
};


function create(req, res, next) {
  User.findById(req.decoded._id).exec()
  .then(function(user){
    var code = generateUniqueRegimenCode(user);
    req.body.forEach(function(newTask){
      console.log("foreach", newTask)
      newTask.idCode = code;
      user.regimen.push(newTask);
    });
    user.save();
    res.send(user.regimen);
  });
};

function destroy(req, res, next) {
  console.log("destroy req", req.body)
  User.findById(req.decoded._id).exec()
    .then(function(user){

      var updatedRegimen = user.regimen.filter(function(task){
        return task.idCode !== req.body.idCode
      })

      user.regimen = updatedRegimen;
      user.save()
      console.log('user d',user)
      res.send(user.regimen)

    })
}

function update(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user){
      var updatedRegimen = user.regimen.filter(function(task){
        return task.idCode !== req.body[0].idCode
      })
      console.log("updated reg pre delete", updatedRegimen)
      updatedRegimen.push(req.body[0])

      user.regimen = updatedRegimen;
      user.save();

      res.send(user.regimen)

    })
}




//helper function


//generating random classcode
function generateCode() {
    var code = "";
    var keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i=0; i < 6; i++ ) {
      code += keys.charAt(Math.floor(Math.random() * keys.length));
    }
    return code;
}

//compare new classCode with existing classCode
function generateUniqueRegimenCode(user) {
  var nextCode;
  var matchingCodes = [];
  do {
    nextCode = generateCode();
    matchingCodes = user.regimen.filter(function(existingCode) {
      return existingCode.idCode === nextCode;
    });
  } while (matchingCodes.length > 0);
  return nextCode;
}

