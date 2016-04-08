(function(){
  "use strict";

  angular
    .module("app")
    .controller("StandupController", StandupController);

  StandupController.$inject = ["$log", "$scope", "trelloApiService", "teamDataService"];

  function StandupController($log, $scope, trelloApiService, teamDataService) {
    var vm = this;

    vm.trello       = trelloApiService;
    vm.dataService  = teamDataService
    vm.startMeeting = startMeeting;

    function startMeeting() {
      teamDataService
        .startNewMeeting()
        .then(function(res) {
          vm.membersLoaded = true;
          $scope.$apply();
        });
    }

    $log.info("StandupController loaded");
  }

})();
