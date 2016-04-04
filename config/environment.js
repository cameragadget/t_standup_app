var _ = require("lodash");

var localEnvVars = {
  TITLE:      "t_standup_app",
  SAFE_TITLE: "t_standup_app"
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
