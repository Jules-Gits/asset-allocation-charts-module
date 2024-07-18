import React from 'react';
import DonutChartsModule from './components/DonutChartsModule';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Portfolio breakdown</h1>
      <p>The pie charts below highlight the investment diversification within the Fund. Please note these charts have been provided for illustrative purposes and they will change over time. For the latest breakdowns, please see the factsheet.</p>
      <DonutChartsModule />
    </div>
  );
}

export default App;