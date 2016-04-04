(function(){
  'use strict';

  angular
    .module('app')
    .controller("DashboardController", DashboardController);

  DashboardController.$inject = ["$log", "trelloApiService"];

  function DashboardController($log, trello) {
    $log.info("DashboardController loaded");

    var vm = this;

    vm.trello = trello;

    vm.selectedBoard = function(boardId){
      $log.info(boardId);


    };










  }




})();
