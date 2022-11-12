import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import styled from 'styled-components';

import Navbar from './Navbar';
import Flashcard from './Flashcard';
import AddFlashcard from './AddFlashcard';

import { getDeck } from "../api/apiCalls";

import { Button, Modal } from "react-bootstrap"

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

const ButtonDiv = styled.button`
    border-radius: 10px;
    color: white;
    background-color: #24a0ed;
    padding: 10px;
    display:flex;
    margin-right: 10px;
    outline: none;
    border: none;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
`

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([])
    const {id} = useParams()
    const [loading, setLoading] = useState(false)

    const[showCreateModal, setShowCreateModal] = useState(false)
    const [displayedCard, setDisplayedCard] = useState()
    const [cardIndex, setCardIndex] = useState(0)
    const [deck, setDeck] = useState()
    const [isDeckLoading, setIsDeckLoading] = useState(false)
    const handleCloseModal = () => setShowCreateModal(false)
    const handleShowModal = () => setShowCreateModal(true)


    useEffect(() => {
        fetchFlashcards(id)
        
    }, [id])


    const fetchFlashcards  = async (id) => {
        try {
            const response = await getDeck(id);
            setFlashcards(response.flashcards)
            setDeck(response.deck[0])
            setLoading(true)
        } catch(error) {
            console.log(error)
        }
    }


    const updateDisplayedCard = async (flashcards) => {
        setDisplayedCard(flashcards[0])
        setCardIndex(0)
        setIsDeckLoading(true)
    }

    useEffect(() => {
        updateDisplayedCard(flashcards)
    }, [flashcards])

    useEffect(() => {
        changeDisplayedCard(cardIndex)
    }, [cardIndex])

    const incrementCardIndex = () => {
        if (cardIndex < flashcards.length - 1) {
          setCardIndex(cardIndex + 1)
          changeDisplayedCard(cardIndex)
        }
      }
      const decrementCardIndex = () => {
        if (cardIndex > 0) {
          setCardIndex(cardIndex - 1)
          changeDisplayedCard(cardIndex)
        }
      }
    
      const changeDisplayedCard = (cardIndex) => {
        if (cardIndex >= 0 && cardIndex < flashcards.length) {
          const card = flashcards.filter((flashcard, index) => index === cardIndex)
          setDisplayedCard(card[0])
        }
      }
    

    return (
        <div>
        <Navbar/>
        <Title>{loading && deck.name}</Title>
        <Container><ButtonDiv onClick={handleShowModal}>
        Create Flashcard
      </ButtonDiv></Container>
      {showCreateModal && (
        <AddFlashcard
          show={showCreateModal}
          deckId={id}
          closeHandler={handleCloseModal}
        />
      )}
     {isDeckLoading && <Flashcard decrement={decrementCardIndex} increment={incrementCardIndex} {...displayedCard} /> }
       </div>
    )
}

export default FlashcardList