(function() {
  "use strict";

  angular
    .module("app")
    .controller("SignInController", SignInController);

  SignInController.$inject = ["$log", "authService", "$state"];

    function SignInController($log, authService, $state) {
    var vm = this;

    vm.login = {
      email: "",
      password: ""
    };

    vm.submitLogIn = submitLogIn;
    vm.conflict = false;


    function submitLogIn() {
      authService
        .logIn(vm.logIn)
        .then(
          // on success
          function(decodedToken) {
            $log.debug('Logged in!', decodedToken);
            $state.go('profile');
          },
          // on error
          function(err) {
            $log.debug('Error:', err);
          }
        );
    }


    $log.debug("SignInController loaded!");
  }
})();
