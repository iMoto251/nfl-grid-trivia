import logo from './resources/images/league.svg.webp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        NFL Grid Trivia
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="game-container">
        <div className="game">
          <div className="cell">a</div>
          <div className="cell">b</div>
          <div className="cell">c</div>
          <div className="cell">d</div>
          <div className="cell">e</div>
          <div className="cell">f</div>
          <div className="cell">g</div>
          <div className="cell">h</div>
          <div className="cell">i</div>
          <div className="cell">j</div>
          <div className="cell">k</div>
          <div className="cell">l</div>
        </div>
      </div>
    </div>
  );
}

export default App;
