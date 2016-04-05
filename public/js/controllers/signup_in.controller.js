(function(){
  "use strict"

  angular
    .module("victor")
    .controller("SignupController", SignupController)

    SignupController.$inject = ["$log", "$state", "authService", "userService"]

    function SignupController($log, $state, authService, userService) {
      $log.info("signup controller")
      var vm = this;

      vm.signUp = {
        email:    "kts@victor.com",
        password: "12345",
        passwordConfirmation: "12345",
        firstName: "Keto",
        lastName:  "San",
        cellNumber:"1234567890",
        zipCode:   "90026"
      };

      vm.logIn = {
        email:    "kts@victor.com",
        password: "12345"
      }

      vm.nofooter = true;

      vm.submitSignUp = submitSignUp;
      vm.submitlogIn  = submitlogIn;


      function submitSignUp() {
        $log.info("signup click")
        userService
          .create(vm.signUp)
          .then(function(res){
            $log.info("login data from controller", res.config.data)
            return authService.logIn(res.config.data)
          })
          .then(function(decodedToken){
            $log.debug('Logged in!', decodedToken);
            $state.go("user");
          }, function(err) {
            if (err.status === 409) vm.conflict = true, vm.missingField = false;
                $log.debug('409 same email', err);
            if (err.status === 422) vm.missingField = true, vm.conflict = false;
                $log.debug('422 missing fields', err);
          });
      }

      function submitlogIn() {
        $log.info("log in click");
        authService.logIn(vm.logIn)
          .then(function(decodedToken){
            $log.debug('Logged in!', decodedToken);
            $state.go("user")
          }, function(err) {
            if (err.status === 409) vm.missingField = false, vm.conflict = true;
                $log.debug('409 same email', err);
            if (err.status === 422) vm.missingField = true;
                $log.debug('422 missing fields', err);
          });
      }





    }

})();
