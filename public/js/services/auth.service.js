(function(){
  "use strict"

  angular
    .module('victor')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"]

  function authService($log, token, $http) {
    $log.debug("authService loaded!");

    return {}


  }
})();
