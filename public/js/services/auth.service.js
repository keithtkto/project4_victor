(function(){
  "use strict"

  angular
    .module('victor')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"]

  function authService($log, token, $http) {

    var service = {
      logIn: logIn,
      isLoggedIn:   isLoggedIn,
    }

    return service;

    function logIn(data){
      return $http({
        method: "POST",
        url:    "/api/token",
        data: data
      })
      .then(function(res) {
        token.store(res.data.token);
        return token.decode(res.data.token);
      })
    }

    function isLoggedIn() {
      checkExpToken()
      return (token.retrieve() != null);
    }

    function checkExpToken() {
      var tokenData = token.decode();

      if (tokenData) {

        tokenData.expiresAt = Date(tokenData.exp);

        delete tokenData.exp;
        delete tokenData.iat;
        if (!tokenData) $log.debug("exp deleted:", tokenData);
      }

      $log.debug("Current user retrieved:", tokenData);
    }



  }
})();
