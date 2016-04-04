(function() {
  'use strict';

  angular
    .module('app')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService"];

  function authService($log, tokenService) {
    $log.debug("authService loaded!");

    var service = {
      isLoggedIn:   isLoggedIn,
      logOut:       logOut,
      logIn:        logIn,
      currentUser:  currentUser,
    };

    return service;

    function currentUser() {
      return tokenService.retrieve();
    }

    function logIn(trelloToken, id, fullName) {
      tokenService.store(trelloToken, id, fullName);
    }

    function logOut() {
      tokenService.destroy();
      $log.debug("Logged out…");
    }

    function isLoggedIn() {
      return (tokenService.retrieve() != null);
    }

  }

})();
