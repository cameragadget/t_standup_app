(function(){
  'use strict';

  angular
    .module('app')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, tokenService, $http) {
    $log.info("authService loaded");

    var service = {
      logIn:        logIn,
      isLoggedIn:   isLoggedIn,
      currentUser:  currentUser
          };

    return service;

    function logIn(data) {
      var promise = $http({
        method: 'POST',
        url:    '/api/token',
        data:   data
      })
      .then(
        function(res) {
          token.store(res.data.token);
          return token.decode();
        }
      );

    function isLoggedIn() {
      return (token.retrieve() != null);
    }

      return promise;
    }

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






  }









})();
