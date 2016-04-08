(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$q", "$state", "$log", "$http", "trelloApiService", "authService", "$rootScope"];

  function teamDataService($q, $state, $log, $http, trelloApiService, authService, $rootScope) {

    var service = {
      sprint:         {},
      sprintSelected: false,

      teams:            [],
      // filteredTeams: [],

      selectedTeam:     {},
      teamSelected:     false,

      selectedBoard:    {},
      meetingMembers:   [],

      reportFormData:        {},

      cardsFound:    false,

      getTeams:             getTeams,
      showTeam:             showTeam,
      createTeam:           createTeam,
      generateANewTeam:     generateANewTeam,
      refreshTeam:          refreshTeam,

      generateCards:         generateCards,
      selectCard:            selectCard,

      updateReport:          updateReport,
      startNewMeeting:       startNewMeeting,
      createMeetingReports:  createMeetingReports,
      trelloApiService:      trelloApiService,
      myBoardId:             trelloApiService.myBoardId
    };

///// this will create an entire new meeting when complete





    // vm.reportFormData = {
    //     sprint:   "",
    //     sprintId: "",
    //     blocker: "",
    //     outlook: ""
    // };



    function updateReport(reportId){
       $log.info("form data", service.reportFormData)
        return $http({
        method: "put",
        url:    "/api/teams/" + service.selectedTeam._id + '/currentMeeting/reports/' + reportId,
        data: service.reportFormData
         }).then(function(response) {
        $log.info("this report was sent as", response);
       }, function(err) {
        $log.info(err);
       });
    }


    function startNewMeeting(boardId) {
      service.sprintSelected = false;
      console.log(this.selectedTeam)
      var deferred = trelloApiService.getBoardMembers(this.selectedTeam.trelloBid);

      return $q.when(deferred).then((data) => {
        service.meetingMembers = data.members;
        return $http({
          method: 'POST',
          url:    '/api/teams/' + this.selectedTeam._id + '/meetings',
          data:   data.members
        }).then(function(response) {
        $log.info("this report was sent as", response);
       }, function(err) {
        $log.info(err);
       });
      });
    }

    function createMeetingReports() {
      $log.info("meetingMem", service.meetingMembers)

      return service.meetingMembers.forEach(function(member){
        $log.info(member);
            var report = {
          id:           member.id,
          fullName:     member.fullName,
          trelloBid:    service.selectedTeam.trelloBid,
      };
      return $http({
          method: 'POST',
          url:    "/api/teams/" + service.selectedTeam._id + '/currentMeeting/reports',
          data: report
        });
      });
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
        $state.go('standups.current');
      });
    }

    function refreshTeam(teamId){
      $log.info("refreshingTeam", teamId);
      return $http.get('api/teams/' + teamId).then(function(response) {
        service.selectedTeam = response.data;
        console.log(response.data);
        $log.info("you chose this team:", service.selectedTeam);
        return service.selectedTeam;
      }, function(errRes) {
        console.error("error finding that team sir!", errRes);
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
      service.reportFormData.current = name;
      service.reportFormData.currentId = id;
      service.sprintSelected = true;
    };

    function generateCards(id, name) {
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
         // $state.go('standups.current');
      // });
    }


 // helper functions
    function persistTeam(teamData) {
      $log.info("sending data");
       $http.post('/api/teams', teamData)
       .then(function(response) {
        $log.info("this team was sent as", response);
        getTeams();
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
