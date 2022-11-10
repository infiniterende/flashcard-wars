import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import Home from './components/Home';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import Leaderboard from './components/Leaderboard';
import Flashcard from './components/Flashcard';
import FlashcardList from './components/FlashcardList';
import Login from './components/Login';
import Profile from './components/Profile';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/profile" element={<Profile/>} />
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/leaderboard" element={<Leaderboard/>} />
    <Route exact path="/decks" element={<DeckList/>} />
    <Route exact path="/decks/:id" element={<FlashcardList/>} />"
    </Routes>
    </Router>
  );
}

export default App;