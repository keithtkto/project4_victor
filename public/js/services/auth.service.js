(function(){
  "use strict"

  angular
    .module('victor')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"]

  function authService($log, token, $http) {
    $log.info("authService loaded!");

    var service = {
      logIn: logIn,
      isLoggedIn:   isLoggedIn,
    }

    return service;

    function logIn(data){
      $log.info("passing for log in", data)
      return $http({
        method: "POST",
        url:    "/api/token",
        data: data
      })
      .then(function(res) {
        $log.info("login token", res.data.token);
        token.store(res.data.token);
        $log.info("token decode", token.decode());
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
