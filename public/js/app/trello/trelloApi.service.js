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
      cards: [],
      myFixedBoards: []
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
      return Trello.get("members/me/boards", {})
      .then(
        function(boards) {
          $log.info("boards found: ", boards);
          service.myBoards = boards;
          boards.forEach(function(board){
            service.myFixedBoards.push({trelloBid: board.id});
            });
          $log.info(service.myFixedBoards);
          $rootScope.$apply();
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };


//// on board selection get ID's (only available info) of all team members
//// *** runs generateTeamMembers and generateLists functions
//// createTeam has been commented out to run independently



    function getBoardMembers(boardId) {
      service.myBoardId = boardId;
      $log.info("service myBoardId", service.myBoardId)
      // teamDataService.createTeam(boardId, boardName);
      return Trello.get("/boards/" + boardId + "/memberships", { fields:"id" })
      .then(
        function(members) {
          // $log.info("members found: ", members);
          service.boardMembers = members;
          // $log.info(service.boardMembers);
          generateTeamMembers(service.boardMembers);
          generateLists(boardId);
        },
        function(err) {
          console.log("Failure: ", err);
        }
      );
    };


//// insert the array of member id #'s to retrieve their full info

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



//// from current SELECTED BOARD, get list of all trello lists on that board


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

/// from selected list from selected board, get list of all cards in that list


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
