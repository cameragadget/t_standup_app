(function(){
  "use strict";

  angular
    .module("app")
    .factory("teamDataService", teamDataService);

  teamDataService.$inject = ["$http"];

  function teamDataService($http) {
    var teamFactory = {
      team: {}
    };

  teamFactory.create = function(teamData) {
    return $http.post('/api/teams/', teamData);
  }



  }


})();
