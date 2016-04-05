(function(){

  "use strict"

  angular
    .module("victor")
    .controller("UserController", UserController)

  UserController.$inject = ["$log", "tokenService", "$state", "$http", "regimenService"]

  function UserController($log, token, $state, $http, regimenService) {
    $log.info("user controller loaded")
    var vm = this;

    vm.logout = logout;
    vm.user   = token.decode();
    vm.submitnewRegimen = submitnewRegimen;

    vm.newRegimen = {name: "123", dosage: "123", description: "123", reminder: true, hour: 1, minute: 30}


    function logout() {
      $log.info("logout click")
      token.destroy();
      $state.go('splash.welcome')
    }

    function submitnewRegimen() {

      $log.info('click', vm.newRegimen)
      regimenService.newRegimen(vm.newRegimen)


    }


  }
})()
