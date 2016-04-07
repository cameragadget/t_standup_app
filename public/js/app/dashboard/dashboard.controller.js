(function(){
  "use strict";

  angular
    .module("app")
    .controller("DashboardController", DashboardController);

  DashboardController.$inject = ["$log", "trelloApiService", "teamDataService"];

  function DashboardController($log, trelloApiService, teamDataService) {
    $log.info("DashboardController loaded");

    var vm = this;

    vm.trello = trelloApiService;

    vm.dataService = teamDataService;

    vm._ = _;

    teamDataService.getTeams();


  }



})();
