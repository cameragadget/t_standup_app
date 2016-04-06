(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$log", "$http", "trelloApiService", "authService"];

  function teamDataService($log, $http, trelloApiService, auth) {

    var service = {
      createTeam: createTeam,
      team: {}
    }

    function createTeam(boardName, boardId){
      var teamData = {
          initiator:      auth.currentUser.fullName,
          initiatorId:    auth.currentUser.id,
          boardName:      boardName,
          trelloBid:      boardId
      }
      persistTeam(teamData);
    }

    return service;

    // helper functions

    function persistTeam(teamData) {
       $http.post('/api/teams/', teamData)
       .then(function(team) {

       }, function(err) {

       })
    }

 }


})();
