(function(){
  "use strict"

  angular
    .module("victor")
    .factory("regimenService", regimenService)

  regimenService.$inject = ["$log", "$http"];

  function regimenService($log, $http) {
    var regimens = {
      newRegimen: newRegimen

    }

    return regimens


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




  }

})();
