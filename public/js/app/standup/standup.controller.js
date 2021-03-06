(function(){
  "use strict";

  angular
    .module("app")
    .controller("StandupController", StandupController);

  StandupController.$inject = ["$log", "$scope", "trelloApiService", "authService", "teamDataService"];

  function StandupController($log, $scope, trelloApiService, authService, teamDataService) {
    var vm = this;



    vm.trello       = trelloApiService;
    vm.dataService  = teamDataService;
    vm.startMeeting = startMeeting;
    vm.authService  = authService;
    vm.completeMeeting = completeMeeting;






    function completeMeeting() {
      $log.info("completeing meeting now captain!")
    }

    function startMeeting() {
      teamDataService
        .startNewMeeting()
        .then(function(res) {
          vm.membersLoaded = true;

          $log.info("Meeting creation accepted:", res);
          $log.info(teamDataService.selectedTeam)
          teamDataService.refreshTeam(teamDataService.selectedTeam._id);
        })
        .then(function(res){
          $log.info("refreshedTeam:", teamDataService.selectedTeam);
          teamDataService.createMeetingReports();
        })
        .then(function(res){
          teamDataService.refreshTeam(teamDataService.selectedTeam._id);
          return res
        }).then(function(res){
          $log.info("refreshedTeam Final:", teamDataService.selectedTeam);
        });
    }

    $log.info("StandupController loaded");
  }

})();






