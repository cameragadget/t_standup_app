(function() {
  "use strict";

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "trelloApiService", "$state"];

  function authService($log, tokenService, trelloApiService, $state) {
    $log.debug("authService loaded!");

    var service = {
      logOut:       logOut,
      logIn:        logIn,
      currentUser:  null
    };

    return service;

    function logIn() {
      return Trello.authorize({
        name: "T Stand Up",
        type: "popup",
        interactive: true,
        expiration: "never",
        persist: true,
        success: onAuthorizeSuccessful,
        scope: { write: false, read: true }
      });
    }

    function onAuthorizeSuccessful() {
      trelloApiService.getMyInfo()
      .then(function(info) {
        service.currentUser = {
          fullName: info.fullName,
          id: info.id,
          token: Trello.token()
        };
        tokenService.store(service.currentUser.token);
        // force a rerun of the digest cycle to update the view…
        $state.go('dashboard');
      });
    }

    function logOut() {
      tokenService.destroy();
      service.currentUser = null;
      $log.debug("Logged out…");
      $state.go("welcome");
    }




  }

})();
