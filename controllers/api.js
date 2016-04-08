var Team = require("../models/team");

var Meeting;
var Report;

// CREATE TEAM

function createTeam(req, res, next) {
  console.log("hello?");

  Team.findOne({trelloBid: req.body.trelloBid})
  .then(function(team){
    if(team){
      return team;
    } else {
      return Team.create({
        initiator:      req.body.initiator,
        initiatorId:    req.body.initiatorId,
        boardName:      req.body.boardName,
        trelloBid:      req.body.trelloBid,
        submitted:      true
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

// UPDATE TEAM

function updateTeam(req, res, next) {
  var teamId  = req.params.id;
  var changes = req.body;

  Team
  .findOne(teamId)
  .then(function(team) {
    return team.update(changes);
  })
  .then(function(status) {
    res.json({msg: "Updated team!", status: status});
  });
}

/// SHOW teams

function showTeam(req, res, next){
  var teamId = req.params.id;

  Team
  .findById(teamId, function(err, team){
    if (err) {
      res.send(err);
    }
    // return team
    res.json(team);
  });
};


/// INDEX teams

function indexTeams(req, res) {
  console.log(req.body);
  console.log(req.user);
  // Find all teams in DB
  Team.find({}, function(err, teams) {
    if (err) {
      res.send(err);
    }
    // Return all teams as json
    res.json(teams);
  });
}



///////////////
///  CREATE MEETING  - meetings can only be created, and gotten, not updated or destroyed

function createMeeting(req, res, next) {
  console.log(req.params);
  console.log(req.body);

  Team
    .findById(req.params.id).exec()
    .then((team) => {
      var message;
      if (team.currentMeeting) {
        res.json({
          message: "Meeting already exists…",
          meeting: team.currentMeeting
        });
      } else {
        team.currentMeeting = {members: req.body};
        team.save(() => {
          res.json({
            message: "Meeting created!",
            meeting: team.currentMeeting
          });
        });
      }
    })
    .catch(function(err) { next(err); });
};

function showMeeting(req, res, next){
  var meetingId = req.params.id;

  Meeting
  .findById(meetingId, function(err, team){
    if (err) {
      res.send(err);
    }
    // return meeting
    res.json(meeting);
  });
};


function indexMeetings(req, res) {
  console.log(req.body);
  console.log(req.user);
  // Find all teams in DB
  Meeting.find({}, function(err, meetings) {
    if (err) {
      res.send(err);
    }
    // Return all meetings as json
    res.json(meetings);
  });
}



///////////////////

/// CREATE REPORT

function createReport(req, res, next) {
  console.log("incoming report" + req.body.id + req.body.fullName + req.body.trelloBid);
  Team
    .findById(req.params.id).exec()
    .then((team) => {
      var reportNew = team.currentMeeting.reports.push({
        memberId:     req.body.id,
        memberName:   req.body.fullName,
        trelloBid:    req.body.trelloBid,
      }) - 1 ;
        team.save(() => {
          res.json({
            message: "report created!",
            report: team.currentMeeting.reports[reportNew]
          });
        });
      })
    .catch(function(err) { next(err); });
};

/////// UPDATE REPORT

function updateReport(req, res, next) {
  console.log("incoming report" + req.body);
  var reportsId = req.params.idReport
  Team
    .findById(req.params.idTeam).exec()
    .then((team) => {
      var reportUpdate = team.currentMeeting.reports.id(req.params.idReport);
      reportUpdate.current = req.body.current;
      reportUpdate.currentId = req.body.id;
      reportUpdate.outlook = req.body.outlook;
      reportUpdate.blocker = req.body.blocker;
        team.save(() => {
          res.json({
            message: "report updated!!",
            report: team.currentMeeting.reports
          });
        });
      })
    .catch(function(err) { next(err); });
};


///// INDEX REPORTS

function indexReports(req, res, next) {
  Meeting.findOne({trelloBid: req.body.trelloBid})
  .then(function(err, team) {
    if (err) res.render(err);
    res.json(meeting.reports)
  })
};

module.exports = {
  createTeam:     createTeam,
  updateTeam:     updateTeam,
  showTeam:       showTeam,
  indexTeams:     indexTeams,
  createMeeting:  createMeeting,
  showMeeting:    showMeeting,
  indexMeetings:  indexMeetings,
  createReport:   createReport,
  updateReport:   updateReport,
  indexReports:   indexReports
}

