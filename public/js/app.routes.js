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
      .state("ourgoals", {
        url:          "/ourgoals",
        templateUrl:  "/js/splash_templates/ourgoals.html"
      })
      .state("theapp", {
        url:          "/theapp",
        templateUrl:  "/js/splash_templates/theapp.html"
      });

    $urlRouterProvider.otherwise("/");

  }


})();
