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
  current:        { type: String, required: true },
  currentId:      { type: String, required: true },
  blocker:        { type: String, default: "blocker" },
  outlook:        { type: String, default: "outlook" },
  trelloBid:      { type: String, required: true },
  submitted:      { type: Boolean, default: false },
  comments:        [commentSchema]
});

var meetingSchema = new mongoose.Schema({
  createdAt:     { type: Date,   default: Date.now },
  boardName:     { type: String, required: true },
  trelloBid:     { type: String, required: true },
  members:       {type: [] },
  reports:         [reportSchema]
});

var teamSchema = new mongoose.Schema({
  initiator:     { type: String, required: true },
  initiatorId:   { type: String, required: true },
  boardName:     { type: String, required: true },
  trelloBid:     { type: String, required: true },
  active:        { type: Boolean, default: true },
  meetings:       [meetingSchema]
});







var Team = mongoose.model("Team", teamSchema);

module.exports = Team;
