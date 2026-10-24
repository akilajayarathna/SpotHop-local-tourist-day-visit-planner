const mongoose = require('mongoose');
require('./Category');

const placeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        tags: [String],
        description: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true
        },
        distanceKm: Number,
        lat: Number,
        lng: Number,
        openingHours: [{ days: String, hours: String }],
        travelTips: [ {title: String, description: String} ],
        location: String,
        highlights: [String],
        contact: { phone: String, website: String },
        entryRequirements: String
    },
    {
        timestamps: true
    }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;