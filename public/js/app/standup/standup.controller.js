(function(){
  "use strict";

  angular
    .module("app")
    .controller("StandupController", StandupController);

  StandupController.$inject = ["$log", "trelloApiService"];

  function StandupController($log, trello) {
    $log.info("StandupController loaded");

    var vm = this;

    vm.trello = trello;


  }

})();
