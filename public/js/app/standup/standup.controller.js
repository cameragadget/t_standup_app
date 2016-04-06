(function(){
  "use strict";

  angular
    .module("app")
    .controller("StandupController", StandupController);

  StandupController.$inject = ["$log", "trelloApiService", "teamDataService"];

  function StandupController($log, trelloApiService, teamDataService) {
    $log.info("StandupController loaded");

    var vm = this;

    vm.trello = trelloApiService;

    vm.dataService = teamDataService


  }

})();
