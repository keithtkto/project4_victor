(function(){
  "use strict"

  angular
    .module("victor")
    .controller("SignupController", SignupController)

    SignupController.$inject = ["$log", "$state", "authService"]

    function SignupController($log, $state, authService) {
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
      }




    }

})();
