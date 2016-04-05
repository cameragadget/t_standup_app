var express = require("express"),
    router  = new express.Router();

var apiController   = require("../controllers/api");

// API resources path
router.get( "/api/teams",                     apiController.indexTeams);
router.get( "/api/teams/:b_id",               apiController.showTeam);
router.post("/api/teams",                     apiController.createTeam);
router.put( "/api/teams/:id",                 apiController.updateTeam);

router.get( "/api/teams/:b_id/meetings",      apiController.indexMeetings);
router.get( "/api/teams/:b_id/meetings/:id",  apiController.showMeeting);
router.post("/api/teams/:b_id/meetings",      apiController.createMeeting);

router.get( "/api/teams/:b_id/meetings/:id/reports",      apiController.indexReports);
router.post("/api/teams/:b_id/meetings/:id/reports",      apiController.createReport);
router.get( "/api/teams/:b_id/meetings/:id/reports/:id",  apiController.updateReport);




module.exports = router;
