(function(){
  "use strict"

  angular
    .module("victor")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"]

  function appRoutes($urlRouterProvider, $stateProvider){
    $stateProvider
      .state("splash", {
        templateUrl:  "js/splash_templates/splash.html"
      })
      .state("splash.welcome", {
        url:          "/",
        templateUrl:  "/js/splash_templates/welcome.html",
      })
      .state("splash.theapp", {
        url:          "/theapp",
        templateUrl:  "/js/splash_templates/theapp.html"
      })
      .state("splash.aboutus", {
        url:          "/aboutus",
        templateUrl:  "/js/splash_templates/aboutus.html",
      })
      .state("splash.signup", {
        url:          "/signup",
        templateUrl:  "/js/splash_templates/signup.html",
        controller:   "SignupController",
        controllerAs: "vm"
      })
      .state("splash.login", {
        url:          "/login",
        templateUrl:  "/js/splash_templates/login.html",
        controller:   "SignupController",
        controllerAs: "vm"
      })
      .state("splash.download", {
        url:          "/download",
        templateUrl:  "/js/splash_templates/download.html"
      })
      .state("user", {
        url:          "/user",
        templateUrl:  "/js/user_templates/user.html",
        authorized: true
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
