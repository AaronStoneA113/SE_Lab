import React from "react";
import "./ResultTable.css";

const SUBJECT_NAMES = ["Minor 1", "Minor 2", "Major 1", "Major 2", "Major 3"];

const GRADE_CLASS = {
  O: "badge-o",
  "A+": "badge-aplus",
  A: "badge-a",
  "B+": "badge-bplus",
  B: "badge-b",
  C: "badge-c",
  D: "badge-d",
  F: "badge-f"
};

export default function ResultTable({ students }) {
  if (!students || students.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            {SUBJECT_NAMES.map((name) => (
              <th key={name}>{name}</th>
            ))}
            <th>Total</th>
            <th>%</th>
            <th>Grade</th>
            <th>CGPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={s.studentId} className={s.failed ? "row-failed" : ""}>
              <td className="col-index">{index + 1}</td>
              <td className="col-id">{s.studentId}</td>
              <td className="col-name">{s.name}</td>
              {s.marks.map((mark, i) => (
                <td key={i} className={mark < 50 ? "mark-fail" : "mark-pass"}>
                  {mark}
                </td>
              ))}
              <td className="col-num">{s.total}</td>
              <td className="col-num">{s.percentage}</td>
              <td>
                <span className={`grade-badge ${GRADE_CLASS[s.grade] || ""}`}>
                  {s.grade}
                </span>
              </td>
              <td className="col-num">{s.cgpa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
