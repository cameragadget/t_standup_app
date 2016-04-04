(function() {
  "use strict";

  angular
    .module("app")
    .controller("trelloSignInController", trelloSignInController);

  trelloSignInController.$inject = ["$log", "tokenService", "$state", "$window"];

  function trelloSignInController($log, tokenService, $state, $window) {
    var vm = this;

    vm.tSignIn    = tSignIn;
    vm.logOut     = logOut;
    vm.isLoggedIn = isLoggedIn;



    function tSignIn(){
      Trello.authorize({
        name: "T Stand Up",
        type: "popup",
        interactive: true,
        expiration: "never",
        persist: true,
        success: function () { onAuthorizeSuccessful(); },
        scope: { write: false, read: true }
      });
    }

     function logOut() {
      tokenService.destroy();
      $log.info("Logged out…");
    }

    function onAuthorizeSuccessful() {
      var token = Trello.token();
      $log.info(token);
      getMyInfo();
    }

    function getMyInfo(){
      var res = Trello.get("members/me", { fields: "username,fullName" });
      $log.info(res);
    }

    function isLoggedIn() {
      return (tokenService.retrieve() != null);
    }

    $log.debug("SignInController loaded!");
  }
})();
