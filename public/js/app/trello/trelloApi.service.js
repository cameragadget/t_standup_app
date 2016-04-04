(function() {
  "use strict";

  angular
    .module("app")
    .factory("trelloApiService", trelloApiService);

  trelloApiService.$inject = ["$log", "tokenService", "$rootScope"];

  function trelloApiService($log, tokenService, $rootScope) {

    var service = {
      myBoards:  [],
      getMyInfo: getMyInfo
    };

    return service;

    function getBoards() {
      return Trello.get("members/me/boards", { fields: "name,id" })
      .then(
        function(boards) {
          $log.info("boards found: ", boards);
          service.myBoards = boards;
          $log.info(service.myBoards);
          $rootScope.$apply();
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };

    function getBoardMembers(boardId) {
      return Trello.get("/boards/" + boardId + "/memberships", {fields: "fullName,id"})
      .then(
        function(members) {
          console.log("members found: ", members);
          return members;
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };


    function getMyInfo(token) {
      return Trello.get("members/me/", { fields: "fullName" })
      .then(
        function(myInfo) {
          $log.info("Well hi there", myInfo.fullName);
          getBoards();
          return myInfo;
        },
        function(err) {
          console.log("Failure:", err);
        }
      );
    };





  }
})();
