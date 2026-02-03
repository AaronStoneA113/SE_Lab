import React from "react";
import "./GradeBar.css";

const GRADE_ORDER = ["O", "A+", "A", "B+", "B", "C", "D", "F"];

const GRADE_COLORS = {
  O: "var(--green)",
  "A+": "var(--blue)",
  A: "var(--accent)",
  "B+": "var(--purple)",
  B: "var(--yellow)",
  C: "var(--orange)",
  D: "#e8a838",
  F: "var(--red)"
};

export default function GradeBar({ stats }) {
  if (!stats || stats.empty || !stats.gradeCounts) return null;

  const total = stats.totalStudents;

  return (
    <div className="grade-bar-section">
      <h3 className="grade-bar-title">Grade Distribution</h3>
      <div className="grade-bar-track">
        {GRADE_ORDER.map((grade) => {
          const count = stats.gradeCounts[grade] || 0;
          if (count === 0) return null;
          const width = (count / total) * 100;
          return (
            <div
              key={grade}
              className="grade-bar-segment"
              style={{ width: `${width}%`, background: GRADE_COLORS[grade] }}
            >
              {width > 8 && <span className="grade-bar-label">{grade}</span>}
            </div>
          );
        })}
      </div>
      <div className="grade-legend">
        {GRADE_ORDER.map((grade) => {
          const count = stats.gradeCounts[grade] || 0;
          if (count === 0) return null;
          return (
            <div key={grade} className="legend-item">
              <span className="legend-dot" style={{ background: GRADE_COLORS[grade] }} />
              <span className="legend-text">{grade}: {count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
