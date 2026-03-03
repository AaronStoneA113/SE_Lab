import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function SearchSeat() {
  const [rollNumber, setRollNumber] = useState('');
  const [examId, setExamId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter roll number');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`${API_URL}/allocation/search`, {
        params: {
          roll_number: rollNumber,
          exam_id: examId
        }
      });

      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Seat not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Your Seat</h2>
      
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Roll Number:</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="e.g., 24MCMB07"
        />
      </div>

      <div className="form-group">
        <label>Exam:</label>
        <select value={examId} onChange={(e) => setExamId(e.target.value)}>
          <option value="1">Exam 1 - Data Structures</option>
          <option value="2">Exam 2 - Algorithms</option>
        </select>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Seat'}
      </button>

      {loading && <div className="loading">Searching...</div>}

      {result && (
        <div className="seat-result">
          <h3>Your Seat Allocation</h3>
          <div className="seat-info">
            <div className="info-item">
              <div className="info-label">Student Name</div>
              <div className="info-value">{result.name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Roll Number</div>
              <div className="info-value">{result.roll_number}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Hall</div>
              <div className="info-value">{result.hall_name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Building</div>
              <div className="info-value">{result.building}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Seat Number</div>
              <div className="info-value">{result.seat_number}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Paper Code</div>
              <div className="info-value">{result.paper_code}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Exam Date</div>
              <div className="info-value">
                {new Date(result.exam_date).toLocaleDateString()}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Exam Time</div>
              <div className="info-value">{result.exam_time}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSeat;
