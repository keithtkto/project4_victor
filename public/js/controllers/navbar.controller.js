(function(){
  "use strict"

  angular
    .module("victor")
    .controller("NavbarController", NavbarController)

    NavbarController.$inject = ["$log", "$state"]

    function NavbarController($log, $state) {
      $log.info("nav controller")
      var vm = this;

      vm.toggle          = false;

    }
})();
