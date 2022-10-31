// import logo from './logo.svg';
import React from 'react';
import './App.css';
import SimpleChart from './components/simpleChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Music Visualization
      </header>
      <div className="App-body">        
        <SimpleChart />        
      </div>
    </div>
    
  );
}

export default App;
