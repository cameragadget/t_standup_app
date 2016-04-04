(function() {
  "use strict";

  angular
    .module("app")
    .controller("trelloSignInController", trelloSignInController);

  trelloSignInController.$inject = ["$scope", "$log", "authService", "trelloApiService", "$state", "$window"];

  function trelloSignInController($scope, $log, authService, trello, $state, $window) {
    var vm = this;

    vm.tSignIn     = tSignIn;
    vm.authService = authService;
    vm.getMyInfo   = getMyInfo;
    vm.trello      = trello;

    function tSignIn(){
      Trello.authorize({
        name: "T Stand Up",
        type: "popup",
        interactive: true,
        expiration: "never",
        persist: false,
        success: function (){ onAuthorizeSuccessful(); },
        scope: { write: false, read: true }
      });
    }

    function onAuthorizeSuccessful() {
      getMyInfo()
      .then(function(info) {
        authService.logIn(Trello.token(), info.id, info.fullName);

        // force a rerun of the digest cycle to update the view…
        $scope.$apply();
      });
    }

    function getMyInfo(token) {
      return Trello.get("members/me/", { fields: "fullName" })
      .then(
        function(myInfo) {
          $log.info("Well hi there", myInfo.fullName);
          return myInfo;
        },
        function(err) {
          console.log("Failure:", err);
        }
      )
    }

    // isLoggedIn();

    $log.debug("SignInController loaded!");
  }
})();
