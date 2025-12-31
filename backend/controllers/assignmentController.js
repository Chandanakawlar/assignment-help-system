const Assignment = require("../models/Assignment");

exports.createAssignment = async (req, res) => {
  const assignment = await Assignment.create({
    ...req.body,
    studentId: req.user.id
  });
  res.json(assignment);
};

exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ status: "OPEN" });
  res.json(assignments);
};

// Helper uploads solution
exports.uploadSolution = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment)
    return res.status(404).json({ message: "Assignment not found" });

  if (assignment.helperId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  assignment.solutionFile = req.file.path;
  assignment.status = "COMPLETED";
  await assignment.save();

  res.json({
    message: "Solution uploaded successfully",
    file: assignment.solutionFile
  });
};
