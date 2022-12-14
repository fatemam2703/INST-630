// import logo from './logo.svg';
import React from 'react';
import './App.css';
import SimpleChart from './components/simpleChart';
import BarChart from './components/barChart';
import FloatingImages from './components/floatingImages';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h4>Musical Artists Dataset Visualization from Last.FM</h4>
      </header>
      <div className="App-body">        
        <SimpleChart />   
        <BarChart />
        <FloatingImages />
      </div>
    </div>
    
  );
}

export default App;
