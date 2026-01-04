const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  helper: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: { type: String, enum: ["open", "accepted", "completed"], default: "open" },
  cost: { type: Number, required: true }, // cost in ₹
  lastDate: { type: Date, required: true }, // last submission date
  file: { type: String }, // optional uploaded file path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
