import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar';
import Flashcard from './Flashcard';

import { getDeck } from "../api/apiCalls";

const DeckContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const DeckBox = styled.div`
    flex-basis: 25%;
    width: 200px;
    height: 150px;
    background-color: lightblue;
    border-radius: 10px;
    box-shadow: 10px 5px 5px;
    justify-content: center;
    display: flex;
    font-weight: 600;
    align-items: center;
    margin: 20px 20px;
    font-size: 20px;
`
const Title = styled.div`
    text-align:center;
    font-weight: 600;
    font-size: 40px;
    padding: 40px;
`
const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchFlashcards(id)
    }, [id])

    const fetchFlashcards  = async (id) => {
        const response = await getDeck(id);
        console.log(response)
        setFlashcards(response)
    }

    return (
        <div>
        <Navbar/>
        <Title>Flashcards</Title>
        {flashcards.map(flashcard => <Flashcard question={flashcard.question} answer={flashcard.answer} />)}
       </div>
    )
}

export default FlashcardList