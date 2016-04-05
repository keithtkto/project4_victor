var User = require("../models/user");


module.exports = {
  index: index,
  create:create,

};



function index(){

}


function create(req, res, next) {
  console.log("req", req.body)
  User.findById(req.decoded._id).exec()
  .then(function(user){
    console.log('create user', user)
    user.regimen.push(req.body)
    user.save()

    res.json({ success: user.regimen})
  })

}

