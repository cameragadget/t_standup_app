var mongoose = require("mongoose"),
    debug    = require("debug")("app:models");

var commentSchema = new mongoose.Schema({
  user:           { type: String, required: true },
  body:           { type: String, required: true },
  comments:       [this]
});

var reportSchema = new mongoose.Schema({
  createdAt:      { type: Date,   default: Date.now },
  memberId:       { type: String, required: true },
  memberName:     { type: String, required: true },
  current:        { type: String, default: "sprint not reported" },
  currentId:      { type: String },
  blocker:        { type: String, default: "blocker not reported" },
  outlook:        { type: String, default: "outlook not reported" },
  trelloBid:      { type: String, required: true },
  submitted:      { type: Boolean, default: false },
  comments:       [commentSchema]
});

var meetingSchema = new mongoose.Schema({
  createdAt:     { type: Date,   default: Date.now },
  openMinutes:   { type: Number, default: 1440 }, // 24 hours!
  closedAt:      { type: Date },
  members:       { type: Array },
  reports:       [reportSchema]
});

var teamSchema = new mongoose.Schema({
  initiator:      { type: String, required: true },
  initiatorId:    { type: String, required: true },
  boardName:      { type: String, required: true },
  trelloBid:      { type: String, required: true },
  active:         { type: Boolean, default: true },
  currentMeeting: meetingSchema,
  pastMeetings:   [meetingSchema]
});







var Team = mongoose.model("Team", teamSchema);

module.exports = Team;
