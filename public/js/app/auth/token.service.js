(function () {
  'use strict';

  angular
    .module('app')
    .factory("tokenService", tokenService);

  tokenService.$inject = ["$log", "$window"];

  function tokenService($log, $window) {
    $log.debug("tokenService loaded!");

    const TOKEN_KEYS = {
      trello:   'trello_token',
      id:       'trello_user_id',
      fullName: 'trello_full_name'
    };
    var service = {
      store:    store,
      retrieve: retrieve,
      destroy:  destroy
    };
    return service;

    function store(trelloToken, id, fullName) {
      $window.localStorage.setItem(TOKEN_KEYS.trello, trelloToken);
      $window.localStorage.setItem(TOKEN_KEYS.id, id);
      $window.localStorage.setItem(TOKEN_KEYS.fullName, fullName);
    }

    function retrieve() {
      var token = {
        trello:   $window.localStorage.getItem(TOKEN_KEYS.trello),
        id:       $window.localStorage.getItem(TOKEN_KEYS.id),
        fullName: $window.localStorage.getItem(TOKEN_KEYS.fullName)
      };

      if (token.trello != null) {
        return token;
      } else {
        return null;
      }

    }

    function destroy() {
      $window.localStorage.removeItem(TOKEN_KEYS.trello);
      $window.localStorage.removeItem(TOKEN_KEYS.id);
      $window.localStorage.removeItem(TOKEN_KEYS.fullName);
    }
  }

})();
