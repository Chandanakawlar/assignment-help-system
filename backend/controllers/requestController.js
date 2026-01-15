const HelpRequest = require("../models/HelpRequest");
const Notification = require("../models/Notification");
const User = require("../models/User");

exports.createRequest = async (req, res) => {
  try {
    const { title, description, cost, lastDate } = req.body;

    if (!title || !description || !cost || !lastDate) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const request = await HelpRequest.create({
      title,
      description,
      cost,
      lastDate,
      student: req.user.id
    });

    // 🔔 Notify all helpers
    const helpers = await User.find({ role: "helper" });

    const notifications = helpers.map(helper => ({
      user: helper._id,
      message: `New help request: ${title} (₹${cost})`
    }));

    await Notification.insertMany(notifications);

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getOpenRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({ status: "open" }).populate("student", "name email");
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id).populate("student");
    if (!request) return res.status(404).json({ msg: "Request not found" });

    request.status = "accepted";
    request.helper = req.user.id;
    await request.save();

    // get helper details
    const helper = await User.findById(req.user.id);

    // create notification for student
    await Notification.create({
      user: request.student._id,
      message: `Your help request has been accepted by ${helper.name} (Email: ${helper.email})`
    });

    res.json({ msg: "Request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

