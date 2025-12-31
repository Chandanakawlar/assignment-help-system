const express = require("express");
const Assignment = require("../models/Assignment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get open assignments (for helpers)
router.get("/open", authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({ status: "OPEN" });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept assignment
router.post("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    if (assignment.status !== "OPEN") return res.status(400).json({ message: "Cannot accept assignment" });

    assignment.helper = req.user.id; // From auth middleware
    assignment.status = "ACCEPTED";
    await assignment.save();

    res.json({ message: "Assignment accepted successfully", assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
