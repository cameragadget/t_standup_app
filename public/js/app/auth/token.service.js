(function () {
  'use strict';

  angular
    .module('app')
    .factory("tokenService", tokenService);

  tokenService.$inject = ["$log", "$window"];

  function tokenService($log, $window) {
    $log.debug("tokenService loaded!");

    const TOKEN_KEY = 'trello_token';
    var service = {
      retrieve: retrieve,
      decode:   decode,
      destroy:  destroy
    };
    return service;

    function retrieve() {
      return $window.localStorage.getItem(TOKEN_KEY);
    }

    function decode() {
      var token = retrieve();
      if (token) {
        return $window.jwt_decode(token);
      } else {
        return null;
      }
    }

    function destroy() {
      $window.localStorage.removeItem(TOKEN_KEY);
    }
  }

})();
