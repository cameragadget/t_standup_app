var Team = require("../models/team");

module.exports = {
  create: create,
}


// CREATE TEAM

function create(req, res, next) {
  console.log(req.body);

  Team.findOne({trelloBid: req.body.trelloBid})
  .then(function(team){
    if(team){
      return team;
    } else {
      return Team.create({
        initiator:      req.body.initiator,
        initiatorId:    req.body.initiatorId,
        boardName:      req.body.boardName,
        trelloBid:      req.body.trelloBid
      });
    }
  })
  .then(function(team) {
    res.json({
      msg:  "Team found or created!",
      team: team
    })
  });
};

