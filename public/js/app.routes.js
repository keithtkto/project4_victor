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
      // user's router begin here
      .state("user", {
        url:          "/user",
        templateUrl:  "/js/user_templates/user.html",
        controller:   "UserController",
        controllerAs: "vm",
        authorized:   true
      })
        .state("user.welcome", {
          url:          "/userwelcome",
          templateUrl:  "/js/user_templates/_welcome.html"
        })
        .state("user.myregimen", {
          url:          "/myregimen",
          templateUrl:  "/js/user_templates/_myregimen.html"
        })
        .state("user.mymeds", {
          url:          "/mymeds",
          templateUrl:  "/js/user_templates/_mymeds.html"
        })
        .state("user.newmeds", {
          url:          "/newmeds",
          templateUrl:  "/js/user_templates/_newmeds.html"
        })
        .state("user.myreport", {
          url:          "/myreport",
          templateUrl:  "/js/user_templates/_myreport.html"
        })
        .state("user.mydoctors", {
          url:          "/mydoctors",
          templateUrl:  "/js/user_templates/_mydoctors.html"
        })
        .state("user.myappointments", {
          url:          "/myappointments",
          templateUrl:  "/js/user_templates/_myappointments.html"
        })
        .state("user.mysupport", {
          url:          "/mysupport",
          templateUrl:  "/js/user_templates/_mysupport.html"
        })
        .state("user.contactus", {
          url:          "/contactus",
          templateUrl:  "/js/user_templates/_contactus.html"
        })

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
        $state.go("splash.login");
        event.preventDefault();
      }

    });
  }


})();
