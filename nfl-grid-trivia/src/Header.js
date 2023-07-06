import * as React from 'react';
import logo from "./resources/images/league.svg.webp"
import './css/Header.css';

function Header(){
    return(
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        NFL Grid Trivia
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    )
}

export default Header;