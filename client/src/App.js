// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Sender from './Sender';
import Receiver from './Receiver';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/sender' element={<Sender/>}/>
        <Route  path='/receiver' element={<Receiver/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
