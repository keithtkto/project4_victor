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
        templateUrl:  "/js/splash_templates/welcome.html"
      })
      .state("theapp", {
        url:          "/theapp",
        templateUrl:  "/js/splash_templates/theapp.html"
      })
      .state("aboutus", {
        url:          "/aboutus",
        templateUrl:  "/js/splash_templates/aboutus.html"
      })
      .state("signup", {
        url:          "/signup",
        templateUrl:  "/js/splash_templates/signup.html"
      })
      .state("login", {
        url:          "/login",
        templateUrl:  "/js/splash_templates/login.html"
      })
      .state("download", {
        url:          "/download",
        templateUrl:  "/js/splash_templates/download.html"
      });

    $urlRouterProvider.otherwise("/");

  }


})();
