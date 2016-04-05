(function(){
  "use strict";

  angular
    .module("app")
    .controller("CrudController", CrudController);

  CrudController.$inject = ["$http", "$log", "trelloApiService", "teamDataService", "dashBoardController", "StandUpController"]

  function CrudController($http, $log, trelloApiService, teamDataService, dashBoardController, StandUpController){
    var vm = this;







  }


})();
