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
         doseUnits:    data.doseUnits,
         quantity:     data.quantity
       };

    return regimens;


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


    function reformMedsArray(data) {
      console.log("reformMed", data)
      var newArr = [];
      data.forEach(function(task, idx) {
        $log.info(idx)
        var hr   = task.hour > 12 ? task.hour - 12 : task.hour
        var apm  = task.hour > 12 ? "pm": "am"
        var timeObj = {hour: hr, minute: task.minute, apm: apm} //for creating new time object for
                                                                //client side
        task.time = [];
        if (idx === 0) {        //add first item to array
          task.time.push(timeObj)
          newArr.unshift(task);
        } else {                //if item is not the same med as previous, add to new array
          if (task.name !== newArr[0].name ||
              task.dosage !== newArr[0].dosage ||
              task.direction !== newArr[0].direction ) {
            $log.info(task)
            task.time.push(timeObj)
            newArr.unshift(task);
          } else {
            $log.info("else")
            newArr[0].time.push(timeObj) //only add new time to timeObj
          }
        }
      });
      return newArr
    }




  }

})();
