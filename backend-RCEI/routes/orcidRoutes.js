const express = require('express');
const router = express.Router();
const { searchOrcidProfiles } = require('../controllers/searchController');
const { getOrcidFundings } = require('../controllers/fundingController');
const { getOrcidWorks } = require('../controllers/workController');
const { getOrcidReviews } = require('../controllers/reviewsController');
const { getOrcidEmployments } = require('../controllers/employmentsController');


router.get('/fundings', getOrcidFundings);
router.get('/search', searchOrcidProfiles);
router.get('/works', getOrcidWorks);
router.get('/reviews', getOrcidReviews);
router.get('/employments', getOrcidEmployments);

module.exports = router;
