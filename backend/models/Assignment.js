const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true }, // <--- Make sure this exists
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  helper: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: { type: String, enum: ["OPEN", "ACCEPTED", "COMPLETED"], default: "OPEN" }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
