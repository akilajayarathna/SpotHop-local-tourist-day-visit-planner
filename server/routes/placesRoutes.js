const express = require('express');
const { getAllPlaces, getPlaceBySlug, createPlace, updatePlace, deletePlace } = require('../controllers/placesController');

const router = express.Router();

router.get('/places', getAllPlaces);
router.get('/places/:slug', getPlaceBySlug);
router.post('/places', createPlace);
router.patch('/places/:id', updatePlace);
router.delete('/places/:id', deletePlace);

module.exports = router;