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
    vm.getMyInfo   = getMyInfo;




    function tSignIn(){
        Trello.authorize({
          name: "T Stand Up",
          type: "popup",
          interactive: true,
          expiration: "never",
          persist: true,
          success: function (){ onAuthorizeSuccessful(); },
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
      getMyInfo()
      .then(function(info){
          vm.info = info;
        });
    }

    function isLoggedIn() {
      return (tokenService.retrieve() != null);
    }



    function getMyInfo() {
      return Trello.get("members/me/", { fields: "fullName" })
      .then(
        function(myInfo) {
        $log.info("Well hi there ", myInfo);
        return myInfo;
      },
        function(err) {
          console.log("Failure: ", err);
          }
        )
    }







    $log.debug("SignInController loaded!");
  }
})();
