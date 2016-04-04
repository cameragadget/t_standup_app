var mongoose = require("./database");

var Team = require("../models/team");

User.remove({}, function(err) {
  Team.remove({}, function(err) {
    mongoose.connection.close();
    process.exit(0);
  })
});
