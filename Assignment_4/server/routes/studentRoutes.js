const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const Student = require("../models/Student");
const { validateStudent } = require("../middleware/validation");
const { computeStudent } = require("../utils/compute");

router.post("/load", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "students.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const students = JSON.parse(raw);

    await Student.deleteMany({});

    const accepted = [];
    const rejected = [];
    const seenIds = new Set();

    for (const student of students) {
      const errors = validateStudent(student, seenIds);
      if (errors.length > 0) {
        rejected.push({ raw: student, errors });
      } else {
        seenIds.add(student.id);
        const computed = computeStudent(student);
        const doc = new Student(computed);
        await doc.save();
        accepted.push(computed);
      }
    }

    res.json({ accepted, rejected, totalRead: students.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}).select("-__v -createdAt -updatedAt").sort({ studentId: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const students = await Student.find({});
    if (students.length === 0) {
      return res.json({ empty: true });
    }

    const percentages = students.map((s) => s.percentage);
    const classAverage = parseFloat((percentages.reduce((a, b) => a + b, 0) / percentages.length).toFixed(2));
    const highest = Math.max(...percentages);
    const lowest = Math.min(...percentages);

    const highestStudent = students.find((s) => s.percentage === highest);
    const lowestStudent = students.find((s) => s.percentage === lowest);

    const gradeCounts = {};
    students.forEach((s) => {
      gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1;
    });

    res.json({
      empty: false,
      classAverage,
      highest: { percentage: highest, name: highestStudent.name, id: highestStudent.studentId },
      lowest: { percentage: lowest, name: lowestStudent.name, id: lowestStudent.studentId },
      gradeCounts,
      totalStudents: students.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
