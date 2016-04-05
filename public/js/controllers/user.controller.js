(function(){

  "use strict"

  angular
    .module("victor")
    .controller("UserController", UserController)

  UserController.$inject = ["$log", "tokenService", "$state", "$http"]

  function UserController($log, token, $state, $http) {
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
      $http({
          method: "post",
          url:    "api/me/regimens",
          data: vm.newRegimen
        })
      .then(function(res){
        $log.info(res.data)
      })

    }


  }
})()
