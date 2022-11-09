import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { getDeck, getFlashcards } from '../api/apiCalls';

import Navbar from './Navbar';

const Flashcard = styled.div`
    display: flex;
    margin: 10% auto;
    justify-content:center;
    align-items:center;
    width: 200px;
    height: 50px;
    padding: 100px;
    background-color: white;
    border-radius: 20px;
    border: 5px solid rgba(0,0,0,0.6);
    font-size: 20px;
    position:relative;
`
const Answer = styled.input`
    padding: 100px;
    width: 200px;
    height: 50px;
    align-items: center;
    margin: 50px auto;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
`

const FlashcardContainer = styled.div`
    display:flex;
    width: 500px;
    margin: 0 auto;
    position:relative;
    justify-content: space-around;
    align-items: center;
    perspective: 1000px;
`
const ArrowButton = styled.button`
    border-radius: 50%;
    border: 1px solid black;
    padding: 10px;
    background-color: rgba(0,0,0,0.8);
    color: white;
`

const Button = styled.button`
    border-radius: 10px;
    color: white;
    background-color: rgba(0,0,0,0.8);
    padding: 10px;
    display:flex;
    margin-right: 10px;
    outline: none;
    border: none;
`

const AnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position:relative;
    
`

const FlashcardBack = styled.div`
display: flex;
margin: 10% auto;
justify-content:center;
align-items:center;
width: 200px;
height: 50px;
padding: 100px;
background-color: white;
border-radius: 20px;
border: 5px solid rgba(0,0,0,0.6);
font-size: 20px;
`

const Container = styled.div`

`
const Deck = ({id, name}) => {
    const [flashcards, setFlashcards] = useState([])
    
    useEffect(() => {
       fetchFlashcards()
    }, [])
    
    const fetchFlashcards = async (id) => {
        const response = await getFlashcards(id);
        setFlashcards(response)
    }

    return (
        <Container>
        <Link path="/decks/:id">{name}</Link>
        
        </Container>
    )
}

export default Deck