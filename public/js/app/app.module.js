(function() {
  "use strict";

  angular
    .module("app", ["ui.router", "ngAnimate"])
    .run(["$rootScope", "$state", "authService",  function($rootScope, $state, authService) {
      $rootScope.$on("$stateChangeStart", function(evt, toState) {
        if (toState.requireAuth && !authService.currentUser) {
          evt.preventDefault();
          $state.go("welcome");
        }
      });
      // authService.logIn();
    }]);


})();
