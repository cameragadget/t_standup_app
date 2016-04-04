(function () {
  'use strict';

  angular
    .module('app')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, token, $http) {
    $log.debug("authService loaded!");

    var service = {
      isLoggedIn:   isLoggedIn,
      logOut:       logOut,
      currentUser:  currentUser,
    };

    return service;

    function currentUser() {
      var tokenData = token.decode();

      if (tokenData) {
        tokenData.expiresAt = Date(tokenData.exp);

        delete tokenData.exp;
        delete tokenData.iat;
      }

      $log.debug("Current user retrieved:", tokenData);

      return tokenData;
    }

    function logOut() {
      token.destroy();
      $log.debug("Logged out…");
    }

    function isLoggedIn() {
      return (token.retrieve() != null);
    }

  }

})();
