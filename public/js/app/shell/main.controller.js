(function() {
  "use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$log", "authService", "teamDataService"];

  function MainController($log, authService, teamDataService) {
    var vm = this;

    vm.authService = authService;

    vm.dataService = teamDataService;

    vm.logIn = function() {
      vm.authService.logIn();
    };



    // isLoggedIn();

    $log.debug("SignInController loaded!");
  }
})();
