const express = require('express');
const getAllPlaces = require('../controllers/placesController');

const router = express.Router();

router.get('/', getAllPlaces);

module.exports = router;