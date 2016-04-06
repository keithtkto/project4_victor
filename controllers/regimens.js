var User = require("../models/user");


module.exports = {
  index: index,
  create:create,
  destroy: destroy
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
    console.log('create user', user)
    var code = generateUniqueRegimenCode(user);
    console.log(code)
    req.body.forEach(function(newTask){
      console.log("foreach", newTask)
      // newTask.idCode = "";
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

      user.regimen.indexOf
      console.log('user d',user)

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

