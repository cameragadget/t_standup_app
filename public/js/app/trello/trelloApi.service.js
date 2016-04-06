(function() {
  "use strict";

  angular
    .module("app")
    .factory("trelloApiService", trelloApiService);

  trelloApiService.$inject = ["$log", "tokenService", "$rootScope"];

  function trelloApiService($log, tokenService, $rootScope) {

    var service = {
      myBoardId: "",
      myBoardName: "",
      myBoards:  [],
      getMyInfo: getMyInfo,
      getBoardMembers: getBoardMembers,
      boardMembers: [],
      teamMembers: [],
      generateLists: generateLists,
      lists: [],
      generateCards: generateCards,
      cards: []
    };


    return service;

    function getMyInfo(token) {
      return Trello.get("members/me/", { fields: "fullName" })
      .then(
        function(myInfo) {
          // $log.info("Well hi there", myInfo.fullName);
          getBoards();
          return myInfo;
        },
        function(err) {
          console.log("Failure:", err);
        }
      );
    };

    function getBoards() {
      return Trello.get("members/me/boards", { fields:"name,id" })
      .then(
        function(boards) {
          // $log.info("boards found: ", boards);
          service.myBoards = boards;
          // $log.info(service.myBoards);
          $rootScope.$apply();
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };


//// on board selection



    function getBoardMembers(boardId, boardName) {
      service.myBoardId = boardId;
      service.myBoardName = boardName;
      // teamDataService.createTeam(boardId, boardName);
      return Trello.get("/boards/" + boardId + "/memberships", { fields:"id" })
      .then(
        function(members) {
          // $log.info("members found: ", members);
          service.boardMembers = members;
          // $log.info(service.boardMembers);
          generateTeamMembers(service.boardMembers);
          generateLists(boardId)
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };


    function generateTeamMembers(members) {
      service.teamMembers = [];
      members.forEach(function(mems) {
       Trello.get("/members/" + mems.idMember, { fields: "fullName,id" })
        .then(
          function(newMem) {
            // $log.info("Well hi there", newMem.fullName);
            service.teamMembers.push(newMem);
            if (service.teamMembers.length === members.length){
              // $log.info(service.teamMembers);
              return service.teamMembers;
            };
          },
          function(err) {
            console.log("Failure:", err);
          }
        )
      });
    };


    function generateLists(boardId) {
      service.lists = [],
        Trello.get("/boards/" + boardId + "/lists")
      .then(
        function(list) {
          $log.info("Lists found: ", list);
          service.lists = list;
        return list;
      },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    }

    function generateCards(listId) {
      service.cards = [],
        Trello.get("/lists/" + listId + "/cards")
      .then(
        function(card) {
          $log.info("Cards found: ", card);
            service.cards = card;
            $log.info(service.cards);
            $rootScope.$apply();
            return card;
        },
          function(err) {
            console.log("Failure: ", err);
          }
        );
    }






  }
})();
