const Place = require('../models/Place');

async function getAllPlaces(req, res) {
    try {
        const places = await Place.find()
            .populate("categoryId", "name")
            .sort({ distanceKm: 1 });
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPlaceBySlug(req, res) {
    try {
        const place = await Place.findOne({ slug: req.params.slug });
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createPlace(req, res) {
    try {
        const place = await Place.create(req.body);
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updatePlace(req, res) {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deletePlace(req, res) {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({ message: "Place deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllPlaces, getPlaceBySlug, createPlace, updatePlace, deletePlace };