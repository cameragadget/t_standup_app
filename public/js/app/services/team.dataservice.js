(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$state", "$log", "$http", "trelloApiService", "authService", "$rootScope"];

  function teamDataService($state, $log, $http, trelloApiService, authService, $rootScope) {

    var service = {
      createTeam: createTeam,
      team: {},
      trelloApiService: trelloApiService,
      generateANewTeam: generateANewTeam,
      boardMembers: trelloApiService.boardMembers,
      listLinkWorks: listLinkWorks,
      generateCards: trelloApiService.generateCards,
      cardsFound: false,
      selectCard: selectCard,
      sprint: {},
      sprintSelected: false,
      teams: [],
      getTeams: getTeams,
      filteredTeams: [],
      selectedTeam: {},
      showTeam: showTeam
    }



    function showTeam(teamId){
      console.log("TEAM ID:", teamId);
      service.selectedTeam = {};
      $http.get('api/teams/' + teamId).then(function(response) {
        service.selectedTeam = response.data;
        console.log(response.data);
        $log.info("you chose this team:", service.selectedTeam);
        return service.selectedTeam;
      }, function(errRes) {
        console.error("error finding that team sir!", errRes);
      })
      .then(function(data){
        trelloApiService.getBoardMembers(data.trelloBid)
      $state.go('standup');
      $rootScope.$apply();
      });
    }

    function getTeams() {
        $http.get('/api/teams').then(function(response) {
          service.teams = response.data;
          $log.info("here are your teams", service.teams);
        }, function(errRes) {
          console.error('Error finding teams!', errRes);
        });
      }



    function selectCard(id, name) {
      $log.info("card selected:", name);
      service.sprint = {id, name};
      service.sprintSelected = true;

    };

    function listLinkWorks(id, name) {
      $log.info("link list works", id, name)
      trelloApiService.generateCards(id);
      service.cardsFound = true
    }

    function generateANewTeam(boardid, boardname){
      trelloApiService.getBoardMembers(boardid, boardname)
      .then(function(){
        createTeam();
         $state.go('standup');
      });
    }


 // helper functions
    function persistTeam(teamData) {
      $log.info("sending data");
       $http.post('/api/teams', teamData)
       .then(function(response) {
        $log.info("this team was sent as", response);
       }, function(err) {
        $log.info(err);
       })
    }


    function createTeam(){
      $log.info("creating team")
      var teamData = {
          initiator:      authService.currentUser.fullName,
          initiatorId:    authService.currentUser.id,
          boardName:      trelloApiService.myBoardName,
          trelloBid:      trelloApiService.myBoardId
      }
      persistTeam(teamData);
    }






    return service;

 }


})();
