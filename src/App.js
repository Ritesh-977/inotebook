import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/Notes/NoteState';
import {Alert} from './components/Alert';


function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert="Amazing Note App"/>
      <div className="container">
      <Routes>
       <Route exact path="/" element = {<Home />} > </Route>
        <Route exact path="/about" element = {<About/>} > </Route>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
