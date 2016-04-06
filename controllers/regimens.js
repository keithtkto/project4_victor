var User = require("../models/user");


module.exports = {
  index: index,
  create:create,
  destroy: destroy,
  update: update
};



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
  console.log("update req", req.body)
  User.findById(req.decoded._id).exec()
    .then(function(user){

      var updatedRegimen = user.regimen.filter(function(task){
        return task.idCode !== req.body[0].idCode
      })

      updatedRegimen.push(req.body)

      user.regimen = updatedRegimen;
      user.save()
      console.log('user edit',user)
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

