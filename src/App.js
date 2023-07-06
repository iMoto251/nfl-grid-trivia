//import logo from './resources/images/league.svg.webp';
import './css/App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game3x3 from './Game3x3';
import Game5x5 from './Game5x5';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Game3x3/>} />
          <Route path="5x5" element={<Game5x5/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
