var Team = require("../models/team");

module.exports = {
  create: create,
  update: update
}


function create(req, res, next) {
  Team
    .creat(req.body)
    .then(function(team){
      res.json({
        success: true,
        message: 'Successfully created team.',
        team: team.boardName
      })
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

