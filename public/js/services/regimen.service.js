(function(){
  "use strict"

  angular
    .module("victor")
    .factory("regimenService", regimenService)

  regimenService.$inject = ["$log", "$http"];

  function regimenService($log, $http) {
    var data = this;


    data.doseUnits = [ "pills", "cc", "ml", "gr",
                      "mg", "drops", "pieces", "puffs",
                      "units", "teaspoon", "tablespoon",
                      "patch", "mcg", "iu", "meq", "carton",
                      "spray"
                    ];

    data.quantity = [ 1, 2, 3, 4, 5,
                      6, 7, 8, 9, 10,
                      11, 12, 13, 14,
                      15, 16, 17, 18,
                      19, 20]



    var regimens = {
         newRegimen:   newRegimen,
         showMeds:     showMeds,
         deleteMed:    deleteMed,
         doseUnits:    data.doseUnits,
         quantity:     data.quantity
       };

    return regimens;

//all the http calls from the regimen
    function newRegimen(data){
      return $http({
          method: "post",
          url:    "api/me/regimens",
          data: data
        })
      .then(function(res){
        $log.info(res.data)
      })
    }

    function showMeds() {
      return $http({
          method: "get",
          url:    "api/me/regimens"
        })
      .then(function(res){
        $log.info(res.data)
        var showMedsArray = reformMedsArray(res.data)
        return showMedsArray
      });
    }

    function deleteMed(data) {
      return $http({
        method: "delete",
        url:    "api/me/regimens",
        data:   data
      }).then(function(res){
        return res
      })
    }

//helper function


    function reformMedsArray(data) {
      console.log("reformMed", data)
      var newArr = [];
      data.forEach(function(task, idx) {
        var hr   = task.hour > 12 ? task.hour - 12 : task.hour
        var apm  = task.hour > 12 ? "pm": "am"
        var timeObj = {hour: hr, minute: task.minute, apm: apm} //for creating new time object for
                                                                //client side
        task.time = [];
        task.idArray = [];
        if (idx === 0) {        //add first item to array
          task.time.push(timeObj);
          task.idArray.push(task._id);
          newArr.unshift(task);
        } else {                //if item is not the same med as previous, add to new array
          if ( task.name !== newArr[0].name ||
               task.dosage !== newArr[0].dosage ||
               task.direction !== newArr[0].direction ) {
            task.idArray.push(task._id);
            task.time.push(timeObj)
            newArr.unshift(task);
          } else {
            newArr[0].time.push(timeObj) //only add new time to timeObj
            newArr[0].idArray.push(task._id);
          }
        }
      });
      return newArr
    }




  }

})();
