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

module.exports = getAllPlaces;