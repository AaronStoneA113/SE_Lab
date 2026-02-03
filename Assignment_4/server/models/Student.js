const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    marks: { type: [Number], required: true },
    total: { type: Number },
    percentage: { type: Number },
    grade: { type: String },
    cgpa: { type: Number },
    failed: { type: Boolean, default: false },
    failedSubjects: { type: [Number] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
