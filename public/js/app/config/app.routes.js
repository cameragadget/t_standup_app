(function(){
  "use strict";

  angular
    .module("app")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"]

  function appRoutes($urlRouterProvider, $stateProvider) {

    $stateProvider
      .state("welcome", {
        url: "/",
        templateUrl: "/js/app/layouts/welcome.html",
        requireAuth: false
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "/js/app/dashboard/dashboard.html",
        controller: "DashboardController",
        controllerAs: "vm",
        requireAuth: true
      })
      .state('standups', {
        url: "/standups",
        templateUrl: "/js/app/standup/standup.html",
        controller: "StandupController",
        controllerAs: "vm",
        requireAuth: true
      })
     .state('standups.current', {
        url: "/current",
        templateUrl: "/js/app/standup/standup.current.html",
        controller: "StandupController",
        controllerAs: "vm",
        requireAuth: true
      });


      $urlRouterProvider.otherwise("/");



  }


})();
