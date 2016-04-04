(function(){
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

  appRoutes.$inject = ['$urlRouterProvider', '$stateProvider']

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
      .state('standup', {
        url: "/standup",
        templateUrl: "/js/app/layouts/standup.html",
        requireAuth: true
      });


      $urlRouterProvider.otherwise('/');

  }





})();
