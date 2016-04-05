(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$http", "authService"];

  function teamDataService($http, auth) {

    var service = {
      createTeam: createTeam
    }

    var teamFactory = {
      team: {}
    };

    return service

  function createTeam(boardName, boardId){
    var teamData = {
        initiator:      auth.currentUser.fullName,
        initiatorId:    auth.currentUser.id,
        boardName:      boardName,
        trelloBid:      boardId
    }
    teamFactory.create(teamData);
  }

  teamFactory.create = function(teamData) {
    return $http.post('/api/teams/', teamData);
  }


 }


})();
