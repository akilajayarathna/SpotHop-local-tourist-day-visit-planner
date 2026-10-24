const User = require("../models/User");

const getPlan = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("plan");
        res.json(user.plan);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const addToPlan = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { plan: req.params.placeId },
        });
        res.json({ message: "Added to plan" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const removeFromPlan = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { plan: req.params.placeId },
        });
        res.json({ message: "Removed from plan" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getPlan, addToPlan, removeFromPlan };