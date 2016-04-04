(function() {
  "use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$log", "authService"];

  function MainController($log, authService) {
    var vm = this;

    vm.authService = authService;

    vm.logIn = function() {
      vm.authService.logIn();
    };



    // isLoggedIn();

    $log.debug("SignInController loaded!");
  }
})();
