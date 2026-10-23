const Place = require('../models/Place');

async function getAllPlaces (req, res) {
    try {
        const response = await Place.find()
            .populate("categoryId", "name")
            .sort({distanceKm: 1});
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch places", error: error.message})
    }
};

async function getPlaceBySlug(req, res) {
    try {
        const response = await Place.findOne({ slug: req.params.slug });
        if (!response) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllPlaces, getPlaceBySlug };