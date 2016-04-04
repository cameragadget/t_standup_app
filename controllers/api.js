var Team = require("../models/team");

module.exports = {
  create: create,
}


// CREATE TEAM

function create(req, res, next) {
  console.log(req.body);
  console.log(req.user);

  Team.findOne({trello_bid: req.body.trello_bid})
  .then(function(team){
    if(team){
      // then go to next step
      return team;
    } else {
      // create new team
      // then go to next step
      return Team.create({
        creator:    req.user.trelloId,
        trello_bid: req.body.trello_bid,
        title:      req.body.title
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


