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
      teamSelected: false,
      showTeam: showTeam,
      startNewMeeting: startNewMeeting,
      selectedBoard: {},
      myBoardId: trelloApiService.myBoardId
    }




///// this will create an entire new meeting when complete


    function createMeetingReports(meeting) {
      meeting.members.forEach(function(member){
        createNewReport(member)
      });
    }


    function addReportToMeeting(report) {
      meeting.reports.push(report)
    }

    function createNewMeetingSchema(selectedTeam) {
      var meeting = {
          createdAt:  Date.now,
          boardName:  service.selectedTeam.name,
          trelloBid:  service.selectedTeam.trelloBid,
          members:    service.boardMembers,
          reports: {}
      }
      return meeting;
    }



    function createNewReport(member) {
      var report = {
          createdAt:    Date.now ,
          memberId:     member.id,
          memberName:   member.fullName,
          current:      "",
          currentId:    "",
          blocker:      "blocker",
          outlook:      "outlook",
          trelloBid:    service.selectedTeam.trelloBid,
          submitted:    false
      }
      return report
    }



    function startNewMeeting(boardId) {
      service.sprintSelected = false;
      trelloApiService.getBoardMembers(boardId)
      .then
    }



/////// on click on team from dashboard list of teams, moves to
//// standup page and changes ng-hide for HTML elements
///// (used to also run the entire getboardmembers function)

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
        // trelloApiService.getBoardMembers(data.trelloBid);
      service.teamSelected = true;
      $state.go('standup');
      $rootScope.$apply();
      });
    }


//// gets teams objects from my database

    function getTeams() {
        $http.get('/api/teams').then(function(response) {
          service.teams = response.data;
          $log.info("here are your teams", service.teams);
        }, function(errRes) {
          console.error('Error finding teams!', errRes);
        });
      }


/////

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



///// generate a new team that does not exist yet on the database

    function generateANewTeam(boardid, boardname){
      service.selectedBoard.trelloBid = boardid;
      service.selectedBoard.boardName = boardname;
      service.myBoardId = boardid;
      // trelloApiService.getBoardMembers(boardid, boardname)
      // .then(function(){
        createTeam();
         $state.go('standup');
      // });
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
          boardName:      service.selectedBoard.boardName,
          trelloBid:      service.selectedBoard.trelloBid
      }
      persistTeam(teamData);
    }




    return service;

 }


})();
