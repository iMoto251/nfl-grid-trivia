//import logo from './resources/images/league.svg.webp';
import './css/App.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game3x3 from './Game3x3';
import Game5x5 from './Game5x5';
import Header from './Header';
import MediaQuery from 'react-responsive';

//import { useMediaQuery } from '@mui/material';


function App() {
  // const isMobile = useMediaQuery({ query: '(max-width: 1224px)'})

  // console.log(isMobile)
  return (
    <div className="App">
      <Header/>
      {/* <MediaQuery minWidth={1224}> */}
        <BrowserRouter>
          <Routes>
            <Route index element={<Game3x3/>} />
            <Route path="5x5" element={<Game5x5/>} />
          </Routes>
        </BrowserRouter>
      {/* </MediaQuery> */}
      {/* <MediaQuery maxWidth={1224}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Game3x3mobile/>} />
          </Routes>
        </BrowserRouter>
      </MediaQuery> */}
      
    </div>
  );
}

export default App;
