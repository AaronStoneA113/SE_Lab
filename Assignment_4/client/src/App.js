import React, { useState, useEffect } from "react";
import "./styles/global.css";
import Header from "./components/Header";
import StatsRow from "./components/StatsRow";
import GradeBar from "./components/GradeBar";
import ResultTable from "./components/ResultTable";
import RejectedList from "./components/RejectedList";
import { loadStudents, fetchStudents, fetchStats } from "./utils/api";

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const refresh = async () => {
    const [studentsRes, statsRes] = await Promise.all([fetchStudents(), fetchStats()]);
    setStudents(studentsRes.data);
    setStats(statsRes.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const res = await loadStudents();
      setRejected(res.data.rejected);
      setSummary({
        totalRead: res.data.totalRead,
        accepted: res.data.accepted.length,
        rejectedCount: res.data.rejected.length
      });
      await refresh();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      <Header onLoad={handleLoad} loading={loading} />

      {summary && (
        <div style={{
          margin: "20px 32px 0",
          padding: "12px 18px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          display: "flex",
          gap: 24,
          fontSize: 13,
          color: "var(--text-secondary)"
        }}>
          <span>Read: <strong style={{ color: "var(--text-primary)" }}>{summary.totalRead}</strong></span>
          <span>Accepted: <strong style={{ color: "var(--green)" }}>{summary.accepted}</strong></span>
          <span>Rejected: <strong style={{ color: "var(--red)" }}>{summary.rejectedCount}</strong></span>
        </div>
      )}

      <StatsRow stats={stats} />
      <GradeBar stats={stats} />

      {students.length > 0 && (
        <>
          <div style={{ padding: "28px 32px 4px" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, color: "var(--text-primary)" }}>
              Results
            </h2>
          </div>
          <ResultTable students={students} />
        </>
      )}

      <RejectedList rejected={rejected} />

      {students.length === 0 && !summary && (
        <div style={{
          textAlign: "center",
          marginTop: 120,
          color: "var(--text-secondary)",
          fontSize: 15
        }}>
          Press <strong style={{ color: "var(--accent)" }}>Load from File</strong> to begin.
        </div>
      )}
    </div>
  );
}
