(function() {
  "use strict";

  angular
    .module("app")
    .controller("trelloSignInController", trelloSignInController);

  trelloSignInController.$inject = ["$log", "$state"];

    function trelloSignInController($log, $state) {
    var vm = this;

    vm.tSignIn = tSignIn


    function tSignIn(){
      Trello.authorize({
        name: "TStandUp",
        type: "popup",
        interactive: true,
        expiration: "never",
        persist: true,
        success: function () { onAuthorizeSuccessful(); },
        scope: { write: false, read: true },
      });
    }

    function onAuthorizeSuccessful() {
    var token = Trello.token();
    $log.info(token);
}

    $log.debug("SignInController loaded!");
  }
})();
