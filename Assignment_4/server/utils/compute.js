function computeTotal(marks) {
  return marks.reduce((sum, m) => sum + m, 0);
}

function computePercentage(total) {
  return parseFloat(((total / 500) * 100).toFixed(2));
}

function assignGrade(percentage) {
  if (percentage >= 90) return "O";
  if (percentage >= 85) return "A+";
  if (percentage >= 75) return "A";
  if (percentage >= 65) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 55) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function computeCGPA(percentage) {
  if (percentage >= 90) return 4.0;
  if (percentage >= 85) return 3.7;
  if (percentage >= 75) return 3.3;
  if (percentage >= 65) return 2.7;
  if (percentage >= 60) return 2.3;
  if (percentage >= 55) return 2.0;
  if (percentage >= 50) return 1.0;
  return 0.0;
}

function getFailedSubjects(marks) {
  const failed = [];
  marks.forEach((mark, index) => {
    if (mark < 50) failed.push(index + 1);
  });
  return failed;
}

function computeStudent(student) {
  const total = computeTotal(student.marks);
  const percentage = computePercentage(total);
  const grade = assignGrade(percentage);
  const cgpa = computeCGPA(percentage);
  const failedSubjects = getFailedSubjects(student.marks);

  return {
    studentId: student.id,
    name: student.name.trim(),
    marks: student.marks,
    total,
    percentage,
    grade,
    cgpa,
    failed: failedSubjects.length > 0,
    failedSubjects
  };
}

module.exports = {
  computeStudent,
  computeTotal,
  computePercentage,
  assignGrade,
  computeCGPA,
  getFailedSubjects
};
