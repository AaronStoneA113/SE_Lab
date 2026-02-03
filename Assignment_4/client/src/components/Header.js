import React from "react";
import "./Header.css";

export default function Header({ onLoad, loading }) {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-dot" />
        <h1 className="header-title">Student Result System</h1>
      </div>
      <button className="load-btn" onClick={onLoad} disabled={loading}>
        {loading ? "Loading..." : "Load from File"}
      </button>
    </header>
  );
}
