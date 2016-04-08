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
          $log.info("fixed boards", service.myFixedBoards);
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
      $log.info("calling getBoardMembers with myBoardId:", service.myBoardId);

      return Trello
        .get("/boards/" + boardId + "/memberships", { fields:"id" })
        .then(function(members) {
          return $.when(
            generateTeamMembers(members),
            generateLists(boardId)
          );
        })
        .then(
          function(members, lists) {
            service.teamMembers = members;
            service.lists = lists;

            return {members: members, lists: lists};
          },
          function(err) {
            console.log("Failure: ", err);
          }
        );
    };


//// insert the array of member id #'s to retrieve their full info

    // FIXME: (PJ) rename this getTeamMembersNames!
    function generateTeamMembers(members) {
      // console.log("Who am I?????", members);
      var fullMembers = [];
      var promises = members.map(function(member) {
        return Trello
          .get("/members/" + member.idMember, { fields: "fullName,id" })
          .then(
            function(fullMember) {
              $log.info("Well hi there", fullMember.fullName);
              fullMembers.push(fullMember);
            },
            function(err) {
              $log.warn("Request for member failed:", err);
            }
          );
      });

      // TODO: comment this bit of insanity…
      //   - (Can't use Promise.all) http://stackoverflow.com/questions/36255685/mixing-es6-promises-with-jquery-promises
      //   - (Can't pass an Array to $.when) http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when
      return $.when.apply($, promises)
        .then(function() {
          return fullMembers;
        });
    };

//// from current SELECTED BOARD, get list of all trello lists on that board


    function generateLists(boardId) {
      // service.lists = [],
      return Trello
        .get("/boards/" + boardId + "/lists")
        .then(
          function(list) {
            $log.info("Lists found: ", list);
            // service.lists = list;
            $rootScope.$apply();
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
