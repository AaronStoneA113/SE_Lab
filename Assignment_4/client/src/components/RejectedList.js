import React from "react";
import "./RejectedList.css";

export default function RejectedList({ rejected }) {
  if (!rejected || rejected.length === 0) return null;

  return (
    <div className="rejected-section">
      <div className="rejected-header">
        <h3 className="rejected-title">Rejected Entries</h3>
        <span className="rejected-count">{rejected.length}</span>
      </div>
      <div className="rejected-list">
        {rejected.map((item, index) => (
          <div key={index} className="rejected-card">
            <div className="rejected-raw">
              <span className="rejected-raw-label">Input</span>
              <span className="rejected-raw-value">
                ID: {item.raw.id || "N/A"} | Name: {item.raw.name || "N/A"} | Marks: [{(item.raw.marks || []).join(", ")}]
              </span>
            </div>
            <div className="rejected-errors">
              {item.errors.map((err, i) => (
                <span key={i} className="rejected-error-tag">{err}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
