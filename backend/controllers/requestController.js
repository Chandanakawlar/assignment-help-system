const HelpRequest = require("../models/HelpRequest");

exports.createRequest = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ msg: "Unauthorized" });

    const { title, description, cost, lastDate } = req.body;
    if (!title || !description || !cost || !lastDate)
      return res.status(400).json({ msg: "All fields required" });

    const request = await HelpRequest.create({
      title,
      description,
      student: req.user.id,
      cost,
      lastDate
    });

    res.json(request);
  } catch (err) {
    console.error("Create Request Error:", err);
    res.status(500).json({ msg: "Server Error" });
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
    const request = await HelpRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    request.helper = req.user.id;
    request.status = "accepted";
    await request.save();

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
