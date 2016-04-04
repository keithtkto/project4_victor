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

      vm.submitSignUp = submitSignUp;



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
          }, function(err) {
            if (err.status === 409) vm.conflict = true;
                $log.debug('Conflicts with some rule already established', err);

          });


      }




    }

})();
