(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$state", "$log", "$http", "trelloApiService", "authService"];

  function teamDataService($state, $log, $http, trelloApiService, authService) {

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
      getTeams: getTeams
    }


// $scope.$on('$stateChangeSuccess', function () {
//   getTeams();
//   // do something
// });

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
      // $log.info(authService.currentUser.fullName)
      // $log.info(authService.currentUser.id)
      // $log.info(trelloApiService.myBoardName)
      // $log.info(trelloApiService.myBoardId)
    });

      // run the make new team call to my DB
      // that passes in board.id, board.name
      // and then returns to the standup view
      // that team.
      // will literally be a blank page that says
      // HI TEAM! START A NEW MEETING!
      // $log.info(boardid, boardname);
  }


 // helper functions
    function persistTeam(teamData) {
      // var newTeamData = JSON.stringify(teamData);
      $log.info("sending data");
       $http.post('/api/teams', teamData)
       .then(function(team) {
        $log.info("this team was sent as", team);
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
