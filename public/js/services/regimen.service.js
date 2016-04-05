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
                      "spray", "reps", "times"
                    ];

    data.quantity = [ 1, 2, 3, 4, 5,
                      6, 7, 8, 9, 10,
                      11, 12, 13, 14,
                      15, 16, 17, 18,
                      19, 20]



    var regimens = {
         newRegimen:   newRegimen,
         showRegimens: showRegimens,
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

    function showRegimens() {
      return $http({
          method: "get",
          url:    "api/me/regimens"
        })
      .then(function(res){
        $log.info(res.data)
        return res.data
      })
    }




  }

})();
