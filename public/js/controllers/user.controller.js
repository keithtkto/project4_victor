(function(){

  "use strict"

  angular
    .module("victor")
    .controller("UserController", UserController)

  UserController.$inject = ["$log", "tokenService", "$state"]

  function UserController($log, token, $state) {
    $log.info("user controller loaded")
    var vm = this;

    vm.logout = logout;


    function logout() {
      $log.info("logout click")
      token.destroy();
      $state.go('splash.welcome')
    }




  }
})()
