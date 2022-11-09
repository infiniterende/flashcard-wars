import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import Home from './components/Home';
import Deck from './components/Deck';
import DeckList from './components/DeckList';
import Leaderboard from './components/Leaderboard';

import './App.css';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/leaderboard" element={<Leaderboard/>} />
    <Route exact path="/decks" element={<DeckList/>} />
    <Route exact path="/decks/:id" element={<Deck/>}/>
    </Routes>
    </Router>
  );
}

export default App;