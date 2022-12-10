import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';

import Deck from './Deck';

import { getAllDecks } from "../api/apiCalls";

const DeckContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
const DeckBox = styled.div`
    flex-basis: 25%;
    width: 200px;
    height: 150px;
    background-color: #455964;
    border-radius: 10px;
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
const DeckList = () => {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        fetchDecks()
    }, [])

    const fetchDecks  = async () => {
        const response = await getAllDecks();
        setDecks(response)
    }
    return (
        <div>
        <Navbar/>
        <Title>Decks</Title>
       <DeckContainer>{decks.map(deck =><DeckBox><Deck id={deck._id} name={deck.name} /></DeckBox>)}</DeckContainer>
    
       </div>
    )
}

export default DeckList