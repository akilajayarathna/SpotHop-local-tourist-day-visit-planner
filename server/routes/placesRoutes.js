const { protect, adminOnly } = require("../middleware/authMiddleware");
const express = require('express');
const { getAllPlaces, getPlaceBySlug, createPlace, updatePlace, deletePlace } = require('../controllers/placesController');

const router = express.Router();

router.get('/places', getAllPlaces);
router.get('/places/:slug', getPlaceBySlug);
router.post('/places', protect, adminOnly, createPlace);
router.patch('/places/:id', protect, adminOnly, updatePlace);
router.put('/places/:id', protect, adminOnly, updatePlace);
router.delete('/places/:id', protect, adminOnly, deletePlace);

module.exports = router;