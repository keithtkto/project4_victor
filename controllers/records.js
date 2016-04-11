var User = require("../models/user");
var _    = require("lodash")

module.exports = {
  index: index,
  edit:  edit
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
          return obj.timeScheduled.toDateString();
      });
      res.send(recordByDate);
    });
}


function edit(req, res, next) {
    return User
      .findRecord2Edit()
      .then(function(allHistory){
        console.log("req.body", req.body)
        var historyId = req.body.record._id

        var takenTime = req.body.takenTime
        var editHistory = _.filter(allHistory, {"id": historyId})

        console.log("editHistory b4", editHistory )

        editHistory[0].timeTaken = takenTime

        console.log("editHistory", editHistory)
        console.log("editHistory parent", editHistory[0].parent().parent())


        editHistory[0].parent().parent().save();

    })
    .then(function(){
      console.log(history)
      //sorting history by date
      var recordByDate = _.groupBy(history, function(obj) {
          return obj.timeScheduled.toDateString();
      });
      res.send(recordByDate);
    });
}
