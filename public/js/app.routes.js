(function(){
  "use strict"

  angular
    .module("victor")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"]

  function appRoutes($urlRouterProvider, $stateProvider){
    $stateProvider
      .state("welcome", {
        url:          "/",
        templateUrl:  "/js/splash_templates/welcome.html",
      })
      .state("theapp", {
        url:          "/theapp",
        templateUrl:  "/js/splash_templates/theapp.html"
      })
      .state("aboutus", {
        url:          "/aboutus",
        templateUrl:  "/js/splash_templates/aboutus.html",
      })
      .state("signup", {
        url:          "/signup",
        templateUrl:  "/js/splash_templates/signup.html",
        controller:   "SignupController",
        controllerAs: "vm"
      })
      .state("login", {
        url:          "/login",
        templateUrl:  "/js/splash_templates/login.html",
        controller:   "SignupController",
        controllerAs: "vm"
      })
      .state("download", {
        url:          "/download",
        templateUrl:  "/js/splash_templates/download.html"
      });

    $urlRouterProvider.otherwise("/");

  }

  angular
    .module('victor')
    .run(authorizeRoutes);

  authorizeRoutes.$inject = ["$state", "authService", "$rootScope" , "$log"];

  function authorizeRoutes($state, authService, $rooteScope, $log) {

    $rooteScope.$on("$stateChangeStart", function(event, toState){

      if (toState.authorized && !authService.isLoggedIn()) {
        $log.debug(`Attempted to go to ${toState.url} but was not logged in.`);
        $state.go("login");
        event.preventDefault();
      }

    });
  }


})();
