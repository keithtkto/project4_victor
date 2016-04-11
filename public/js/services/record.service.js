(function(){

  "use strict"

  angular
    .module("victor")
    .factory("recordService", recordService)

    recordService.$inject = ["$log", "$http", "_"]

    function recordService($log, $http, _ ){
      var recordData = {
        showRecord: showRecord,
        editTimeTaken: editTimeTaken,
      }
      return recordData


      function showRecord(){
        return $http({
          method: "get",
          url:    "api/me/records"
        })
        .then(function(record){
          return record
        })
      }

      function editTimeTaken(record, time){

        $log.info("service",time)
        var minute = time.min;
        var hour   = time.apm === "am" ? time.hr : (parseInt(time.hr) + 12);
        var formatedTime = new Date(record.timeScheduled);
          //setHours(-1) actually set back to previous day (23:15 hours)
        if (time.day === "yesterday") formatedTime.setHours(-1);
        formatedTime.setHours(hour);
        formatedTime.setMinutes(minute);


        $log.info("formatedTime", formatedTime)

        return $http({
          method: "put",
          url:    "api/me/records",
          data:    {record: record, takenTime: formatedTime}
        })
        .then(function(record){
          return record
        })
      }
    }
})();
