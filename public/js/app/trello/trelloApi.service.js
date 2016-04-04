(function() {
  "use strict";

  angular
    .module("app")
    .factory("trelloApiService", trelloApiService);

  trelloApiService.$inject = ["$log", "tokenService", "$state", "$window"];

  function trelloApiService($log, tokenService, $state, $window) {
    var service = {
      getBoards: getBoards
    };

    return service;

    function getBoards() {
      return Trello.get("members/me/boards", { fields: "name,id" })
      .then(
        function(boards) {
        $log.info("boards found: ", boards);
        return boards;
      },
      function(err) {
      console.log("Failure: ", err);
      }
      )

    }

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











  }
})();
