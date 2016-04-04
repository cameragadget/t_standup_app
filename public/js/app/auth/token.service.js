(function () {
  "use strict";

  angular
    .module("app")
    .factory("tokenService", tokenService);

  tokenService.$inject = ["$log", "$window"];

  function tokenService($log, $window) {
    $log.debug("tokenService loaded!");

    const TOKEN_KEY = {
      trello:   "trello_token",
    };

    var service = {
      store:    store,
      retrieve: retrieve,
      destroy:  destroy
    };

    return service;

    function store(trelloToken) {
      $window.localStorage.setItem(TOKEN_KEY.trello, trelloToken);
    }

    function retrieve() {
      var token = {
        trello:   $window.localStorage.getItem(TOKEN_KEY.trello),
      };

      if (token.trello != null) {
        return token;
      } else {
        return null;
      }
    }

    function destroy() {
      $window.localStorage.removeItem(TOKEN_KEY.trello);
    }


  }

})();
