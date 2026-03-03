import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function GenerateAllocation() {
  const [examId, setExamId] = useState('1');
  const [mode, setMode] = useState('same_paper');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/allocation/generate`, {
        exam_id: examId,
        mode: mode
      });

      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate allocation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Seating Allocation</h2>
      
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Exam ID:</label>
        <select value={examId} onChange={(e) => setExamId(e.target.value)}>
          <option value="1">Exam 1 - Data Structures</option>
          <option value="2">Exam 2 - Algorithms</option>
        </select>
      </div>

      <div className="form-group">
        <label>Allocation Mode:</label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="same_paper">Same Paper (Alternate Seating)</option>
          <option value="mixed_papers">Mixed Papers (Max Utilization)</option>
        </select>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Allocation'}
      </button>

      {loading && <div className="loading">Generating allocation...</div>}

      {result && (
        <div className="summary-card">
          <h3>Allocation Summary</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-value">{result.summary.total_students}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{result.summary.allocated}</div>
              <div className="stat-label">Allocated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{result.summary.unallocated}</div>
              <div className="stat-label">Unallocated</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{result.summary.utilization}%</div>
              <div className="stat-label">Utilization</div>
            </div>
          </div>

          {result.allocations.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px' }}>Seat Allocations</h3>
              <table className="allocation-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Hall</th>
                    <th>Seat Number</th>
                    <th>Paper Code</th>
                  </tr>
                </thead>
                <tbody>
                  {result.allocations.slice(0, 20).map((allocation, index) => (
                    <tr key={index}>
                      <td>{allocation.roll_number}</td>
                      <td>{allocation.student_name}</td>
                      <td>{allocation.hall_name}</td>
                      <td>{allocation.seat_number}</td>
                      <td>{allocation.paper_code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.allocations.length > 20 && (
                <p style={{ marginTop: '10px', color: '#666' }}>
                  Showing 20 of {result.allocations.length} allocations
                </p>
              )}
            </>
          )}

          {result.unallocated.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px', color: '#c00' }}>Unallocated Students</h3>
              <table className="allocation-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {result.unallocated.map((student, index) => (
                    <tr key={index}>
                      <td>{student.roll_number}</td>
                      <td>{student.name}</td>
                      <td>{student.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GenerateAllocation;
