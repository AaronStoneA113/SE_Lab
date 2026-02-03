function validateStudent(student, seenIds) {
  const errors = [];

  if (!student.id || typeof student.id !== "string") {
    errors.push("Student ID is missing or not a string.");
  } else {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(student.id)) {
      errors.push(`ID "${student.id}" contains special characters.`);
    } else if (seenIds.has(student.id)) {
      errors.push(`ID "${student.id}" is a duplicate.`);
    }
  }

  if (!student.name || typeof student.name !== "string") {
    errors.push("Name is missing or not a string.");
  } else {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(student.name.trim())) {
      errors.push(`Name "${student.name}" contains digits or special characters.`);
    }
  }

  if (!Array.isArray(student.marks) || student.marks.length !== 5) {
    errors.push("Marks must be an array of exactly 5 numbers.");
  } else {
    student.marks.forEach((mark, index) => {
      if (typeof mark !== "number" || mark < 0 || mark > 100) {
        errors.push(`Mark in subject ${index + 1} is out of range [0, 100]. Got: ${mark}`);
      }
    });
  }

  return errors;
}

module.exports = { validateStudent };
