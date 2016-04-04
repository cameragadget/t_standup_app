var express = require('express'),
    router  = new express.Router();

// API resources path
router.get( '/api/teams',                 apiController.index);
router.get( '/api/teams/:b_id',           apiController.show);
router.post('/api/teams',                 apiController.create);
router.put( '/api/teams/:id',             apiController.update);


module.exports = router;
