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
        templateUrl: "/js/app/layouts/welcome.html"
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "/js/app/layouts/dashboard.html"
      })
      .state('standup', {
        url: "/standup",
        templateUrl: "/js/app/layouts/standup.html"
      })
      .state('signin', {
        url: "/signin",
        templateUrl: "/js/app/layouts/signin.html"
      });


      $urlRouterProvider.otherwise('/');

  }





})();
