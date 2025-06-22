const express = require('express');
const router = express.Router();
const { searchOrcidProfiles } = require('../controllers/searchController');
const { getOrcidFundings } = require('../controllers/fundingController');


router.get('/self/fundings', getOrcidFundings);
router.get('/search', searchOrcidProfiles);

module.exports = router;
