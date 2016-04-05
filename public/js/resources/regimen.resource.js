(function(){

  "use strict"

  angular
    .module("victor")
    .factory("regimenResource", regimenResource)

  regimenResource.$inject = ["$log","$resource"]

  function regimenResource($log, $resource){

    $log.info("regimen resource loaded")

    return $resource(
      "http://localhost:3000/api/me/regimen/:id" ,
      {id : "@_id"}, {
        create: {method: "post"}
      }
    )
  }

})();
