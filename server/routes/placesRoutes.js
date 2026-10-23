const express = require('express');
const { getAllPlaces, getPlaceBySlug } = require('../controllers/placesController');

const router = express.Router();

router.get('/places', getAllPlaces);
router.get('/places/:slug', getPlaceBySlug)

module.exports = router;