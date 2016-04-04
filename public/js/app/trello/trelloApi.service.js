(function() {
  "use strict";

  angular
    .module("app")
    .controller("trelloApiService", trelloApiService);

  trelloApiService.$inject = ["$log", "tokenService", "$state", "$window"];

  function trelloApiService($log, tokenService, $state, $window) {
    var vm = this;
    vm.getBoards = getBoards;


    function getBoards() {
      Trello.get("members/me/boards", { fields: "name,id" })
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















  }
})();
