var Team = require("../models/team");
var Meeting = require("../models/team/meeting");
var Report = require("../models/team/meeting/report");




// CREATE TEAM

function createTeam(req, res, next) {
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

// UPDATE TEAM

function updateTeam(req, res, next) {
  var teamId  = req.params.id;
  var changes = req.body;

  Team
  .findById(teamId)
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
  console.log(req.body);
  console.log(req.user);
  Meeting.create({
        boardName:     boardName,
        trelloBid:     trelloBid
  })
    .then(function(meeting) {
      // return Meeting object
      res.json({
        msg:  "Meeting created!",
        report: meeting
    })
  });
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
  console.log(req.body);
  console.log(req.user);
  Meeting.reports.create({
        memberId:     memberId,
        memberName:   memberName,
        current:      current,
        currentId:    currentId,
        blocker:      blocker,
        outlook:      outlook,
        trelloBid:    trelloBid,
  })
    .then(function(report) {
      // return report object
      res.json({
        msg:  "Report created!",
        report: report
    })
  });
};

/////// UPDATE REPORT

function updateReport(req, res, next) {
  var reportID  = req.params.id;
  var changes = req.body;

  Report
  .findById(reportId)
  .then(function(report) {
    return report.update(changes);
  })
  .then(function(status) {
    res.json({msg: "Updated report!", status: status});
  });
}


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

