const express = require('express');
const router = express.Router();
const { searchOrcidProfiles } = require('../controllers/searchController');
const { getOrcidFundings } = require('../controllers/fundingController');
const { getOrcidWorks } = require('../controllers/workController');
const { getOrcidReviews } = require('../controllers/reviewsController');


router.get('/fundings', getOrcidFundings);
router.get('/search', searchOrcidProfiles);
router.get('/works', getOrcidWorks);
router.get('/reviews', getOrcidReviews);

module.exports = router;
