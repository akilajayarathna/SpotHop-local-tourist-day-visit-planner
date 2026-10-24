const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getPlan, addToPlan, removeFromPlan } = require("../controllers/planController");

router.use(protect);

router.get("/", getPlan);
router.post("/:placeId", addToPlan);
router.delete("/:placeId", removeFromPlan);

module.exports = router;