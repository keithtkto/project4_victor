(function(){

  "use strict"

  angular
    .module("victor")
    .controller("UserController", UserController)

  UserController.$inject = ["$log", "tokenService", "$state", "$http", "regimenService"]

  function UserController($log, token, $state, $http, rs) {
    $log.info("user controller loaded")
    var vm = this;
    $log.info("rs", rs)
    vm.logout             = logout;
    vm.user               = token.decode();
    vm.submitnewRegimen   = submitnewRegimen;
    vm.showRegimens       = showRegimens;
    vm.doseUnits          = rs.doseUnits;
    vm.quantity           = rs.quantity;


    vm.newRegimen = {name: "123", dosage: "123", description: "123", reminder: true, hour: 1, minute: 30};




    function logout() {
      $log.info("logout click");
      token.destroy();
      $state.go('splash.welcome');
    }

    function submitnewRegimen() {
      $log.info('click', vm.newRegimen);
      rs.newRegimen(vm.newRegimen)
      .catch(function(err){
        $log.debug(err)
      });
    }

    function showRegimens() {
      rs.showRegimens()
      .then(function(data) {
        $log.info(data);
        vm.regimenIndex = data;
        $log.info(vm.regimenIndex);
      });
    }


  }
})()
