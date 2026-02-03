import React from "react";
import "./StatsRow.css";

export default function StatsRow({ stats }) {
  if (!stats || stats.empty) return null;

  return (
    <div className="stats-row">
      <div className="stat-card stat-avg">
        <span className="stat-label">Class Average</span>
        <span className="stat-value">{stats.classAverage}%</span>
      </div>
      <div className="stat-card stat-high">
        <span className="stat-label">Highest</span>
        <span className="stat-value">{stats.highest.percentage}%</span>
        <span className="stat-sub">{stats.highest.name}</span>
      </div>
      <div className="stat-card stat-low">
        <span className="stat-label">Lowest</span>
        <span className="stat-value">{stats.lowest.percentage}%</span>
        <span className="stat-sub">{stats.lowest.name}</span>
      </div>
      <div className="stat-card stat-total">
        <span className="stat-label">Students</span>
        <span className="stat-value">{stats.totalStudents}</span>
      </div>
    </div>
  );
}
