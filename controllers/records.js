var User = require("../models/user");
var _    = require("lodash")

module.exports = {
  index: index,
};


function index(req, res, next) {
    User.findById(req.decoded._id).exec()
    .then(function(user) {

      return _.flatten(_.map(user.regimen, 'history'))
    })
    .then(function(history){
      console.log(history)
      //sorting history by date
      var recordByDate = _.groupBy(history, function(obj) {
          return obj.timeScheduled
      });
      res.send(recordByDate);
    });
}
