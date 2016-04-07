(function(){
  "use strict";

  angular
    .module("app")
    .factory("meetingDataService", meetingDataService);

  meetingDataService.$inject = ["$state", "$log", "$http", "trelloApiService", "authService", "teamDataService", "$rootScope"];

  function meetingDataService($state, $log, $http, trelloApiService, authService, teamDataService, $rootScope) {

    var service = {
      generateMeeting: generateMeeting,
      trelloApiService: trelloApiService,
      generateCards: trelloApiService.generateCards

    };


    function generateMeeting (){

    }







    return service;

 }


})();
