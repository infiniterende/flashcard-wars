import React, {useState, useRef, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { io } from 'socket.io-client';

import Home from './components/Home';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import Leaderboard from './components/Leaderboard';
import Flashcard from './components/Flashcard';
import FlashcardList from './components/FlashcardList';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Register from './components/Register';
import Game from './components/Game';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

 
  
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/profile" element={<Profile/>} />
    <Route exact path="/login" element={<Signin/>} />
    <Route exact path="/signup" element={<Register/>} />
    {/* <Route exact path="/leaderboard" element={<Leaderboard/>} /> */}
    <Route exact path="/decks" element={<DeckList/>} />
    <Route exact path="/compete" element={<Game/>} />
    <Route exact path="/decks/:id" element={<FlashcardList/>} />
    </Routes>
    </Router>
  );
}

export default App;