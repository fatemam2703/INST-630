// import logo from './logo.svg';
import React from 'react';
import './App.css';
import SimpleBarChart from './components/simpleBarChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Music Visualization
      </header>
      <div className="App-body">        
        <SimpleBarChart />        
      </div>
    </div>
    
  );
}

export default App;
