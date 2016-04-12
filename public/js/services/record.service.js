(function(){

  "use strict"

  angular
    .module("victor")
    .factory("recordService", recordService)

    recordService.$inject = ["$log", "$http", "_"]

    function recordService($log, $http, _ ){
      var recordData = {
        showRecord: showRecord,
        editIsTaken: editIsTaken,
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

      function editIsTaken(record){

        return $http({
          method: "put",
          url:    "api/me/records",
          data:    record
        })
        .then(function(record){
          return record
        })
      }
    }
})();
