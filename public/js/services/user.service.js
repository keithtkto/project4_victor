(function(){
  "use strict"

  angular
    .module("victor")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http"];

    function userService($log, $http) {
      $log.info("userService loaded")

      var service = {
        create: create
      }

      return service

      function create(data){
        $log.info("create user", data)
        return $http({
          method: "POST",
          url: "/api/users",
          data: data
        });
      }

    }
})();
