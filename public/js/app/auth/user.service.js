(function(){
  'use strict';

  angular
    .module('app')
    .factory("userService", userService);

  userService.inject = ["$log"];

  function userService($log) {
    $log.debug("userService loaded!");












  }





})();
