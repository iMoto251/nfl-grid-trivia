//import logo from './resources/images/league.svg.webp';
import './css/App.css';
import * as React from 'react';
import Game from './Game';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Game/>
    </div>
  );
}

export default App;
