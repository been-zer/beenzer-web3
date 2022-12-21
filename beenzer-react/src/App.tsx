import React from 'react';
import './App.css';
import MintNft from './components/MintNft';
import MintToken from './components/MintToken';
import SendSol from './components/SendSol';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MintNft />
        {/* <MintToken /> */}
        <SendSol />
      </header>
    </div>
  );
}

export default App;
