const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

// Get logged-in user's notifications
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Mark notification as read
router.put("/:id", auth, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ msg: "Marked as read" });
});

module.exports = router;
