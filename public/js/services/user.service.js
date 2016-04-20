(function(){
  "use strict"

  angular
    .module("victor")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http"];

    function userService($log, $http) {

      var service = {
        create: create
      }

      return service

      function create(data){
        return $http({
          method: "POST",
          url: "/api/users",
          data: data
        });
      }

    }
})();
