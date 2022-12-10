import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { getDeck, getFlashcards } from '../api/apiCalls';

import Navbar from './Navbar';
import Flashcard from './Flashcard';



const Deck = ({id, name}) => {
    const [flashcards, setFlashcards] = useState([])
    
    useEffect(() => {
       fetchFlashcards(id)
    }, [id])
    
    const fetchFlashcards = async (id) => {
        try {
            const response = await getFlashcards(id);
            setFlashcards(prevState => [...prevState, response.flashcards])
        } catch(error) {
            console.log(error)
        }
        
        
    }

    return (
        <div>
        <Link style={{"textDecoration": "none", "color": "white"}} to={`/decks/${id}`}>{name}</Link>
        
        </div>
    )
}

export default Deck