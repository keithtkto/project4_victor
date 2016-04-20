var User = require("../models/user");
var _    = require("lodash")

module.exports = {
  index: index,
  edit:  edit
};


function index(req, res, next) {
  showRecords(req, res)
}


function edit(req, res, next) {
    return User
      .findRecord2Edit()
      .then(function(allHistory){
        console.log("req.body", req.body)
        var historyId = req.body._id
        var editHistory = _.filter(allHistory, {"id": historyId})


        editHistory[0].isTaken = !editHistory[0].isTaken

        console.log("editHistory[0] b4", editHistory[0] )
        console.log("editHistory parent", editHistory[0].parent().parent())

        editHistory[0].parent().parent().save();
        res.json({
          success: 200,
          editedId: editHistory[0]._id,
          message: "Successfully changed isTaken status"
        });
    });
}


function showRecords(req, res){
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
