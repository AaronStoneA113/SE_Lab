import React, { useState } from 'react';
import './App.css';
import GenerateAllocation from './components/GenerateAllocation';
import SearchSeat from './components/SearchSeat';

function App() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exam Hall Seating Allocation System</h1>
        <p>Automated seat allocation with 8-way constraint enforcement</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === 'generate' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('generate')}
        >
          Generate Allocation
        </button>
        <button 
          className={activeTab === 'search' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('search')}
        >
          Search Seat
        </button>
      </div>

      <div className="content">
        {activeTab === 'generate' && <GenerateAllocation />}
        {activeTab === 'search' && <SearchSeat />}
      </div>

      <footer className="App-footer">
        <p>University of Hyderabad | MTech IT | Software Engineering Lab</p>
      </footer>
    </div>
  );
}

export default App;
