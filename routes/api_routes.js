var express = require("express"),
    router  = new express.Router();

var apiController   = require("../controllers/api");

// API resources path
router.get( "/teams",                     apiController.indexTeams);
router.get( "/teams/:id",                 apiController.showTeam);
router.post("/teams",                     apiController.createTeam);
router.put( "/teams/:id",                 apiController.updateTeam);

router.get( "/teams/:b_id/meetings",      apiController.indexMeetings);
router.get( "/teams/:b_id/meetings/:id",  apiController.showMeeting);
router.post("/teams/:id/meetings",        apiController.createMeeting);

router.get( "/teams/:b_id/meetings/:id/reports",      apiController.indexReports);
router.post("/teams/:b_id/meetings/:id/reports",      apiController.createReport);
router.get( "/teams/:b_id/meetings/:id/reports/:id",  apiController.updateReport);




module.exports = router;
