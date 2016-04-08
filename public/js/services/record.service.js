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

        // var formatedTime = record.timeScheduled

        // time.apm === "am" ? "" : time.hr + 12

        // formatedTime.setHours(time.hr)
        // for
        return $http({
          method: "put",
          url:    "api/me/records",
          data:    {record: record, time: time}
        })
        .then(function(record){
          return record
        })
      }
    }
})();
