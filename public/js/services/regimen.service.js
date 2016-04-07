(function(){
  "use strict"

  angular
    .module("victor")
    .factory("regimenService", regimenService)
    .con

  regimenService.$inject = ["$log", "$http","_"];

  function regimenService($log, $http, _) {
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
         editRegimen:  editRegimen,
         showRegimens:  showRegimens,
         doseUnits:    data.doseUnits,
         quantity:     data.quantity
       };

    return regimens;

//all the http calls from the regimen
    function showMeds() {
      return $http({
          method: "get",
          url:    "api/me/regimens"
        })
      .then(function(res){
        $log.info(res.data)
        return reformMedsArray(res.data)
      });
    }

    function showRegimens() {
      return $http({
          method: "get",
          url:    "api/me/regimens"
        })
      .then(function(res){

        var tasks = res.data
        var sortedTasks  =  _.sortBy(tasks, ["hour", "minute"])

        var reformatTasks = [];
        sortedTasks.forEach(function(task,idx){

          if (idx === 0) {
            var innerTasksArray = [task];
            reformatTasks.unshift(innerTasksArray);
          } else {

            if ( task.hour === sortedTasks[idx - 1].hour ) {
              reformatTasks[0].push(task)
            } else {
              var innerTasksArray = [task];
              reformatTasks.unshift(innerTasksArray);
            };
          };
        });

        return reformatTasks.reverse()
      });
    }

    function newRegimen(data){
      return $http({
          method: "post",
          url:    "api/me/regimens",
          data: data
        })
      .then(function(res){
        $log.info(res.data)
        return reformMedsArray(res.data)

      })
    }

    function deleteMed(data) {
      return $http({
        method: "delete",
        url:    "api/me/regimens",
        data:   data
      }).then(function(res){
        $log.info("delete return data",res.data)
        return reformMedsArray(res.data)
      })
    }

    function editRegimen(data){
      return $http({
        method: "put",
        url:    "api/me/regimens",
        data:   data
      }).then(function(res){
        $log.info("edit return data", res.data)
        return reformMedsArray(res.data)
      });
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
          if ( task.idCode !== newArr[0].idCode ) {
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
