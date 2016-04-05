var User = require("../models/user");


module.exports = {
  index: index,
  create:create,

};



function index(req, res, next) {
  User.findById(req.decoded._id).exec()
  .then(function(user){
    res.send(user.regimen)
  })
}


function create(req, res, next) {
  console.log("req", req.body)
  User.findById(req.decoded._id).exec()
  .then(function(user){
    console.log('create user', user)
    user.regimen.push(req.body)
    user.save()
    res.send(user.regimen)
  })

}

