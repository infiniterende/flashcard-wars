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
const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([])
    const {id} = useParams()

    const[showCreateModal, setShowCreateModal] = useState(false)
    const [displayedCard, setDisplayedCard] = useState()
    const [cardIndex, setCardIndex] = useState(0)

    const handleCloseModal = () => setShowCreateModal(false)
    const handleShowModal = () => setShowCreateModal(true)


    useEffect(() => {
        fetchFlashcards(id)
        updateDisplayedCard()
    }, [id])

    const fetchFlashcards  = async (id) => {
        try {
            const response = await getDeck(id);
            console.log(response)
            setFlashcards(response)
        } catch(error) {
            console.log(error)
        }
    }

    const updateDisplayedCard = async () => {
        setDisplayedCard(flashcards[0])
        console.log(displayedCard)
        setCardIndex(0)
    }
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
        <Title>Flashcards</Title>
        <Button variant="primary" onClick={handleShowModal}>
        Create Flashcard
      </Button>
      {showCreateModal && (
        <AddFlashcard
          show={showCreateModal}
          deckId={id}
          closeHandler={handleCloseModal}
        />
      )}
        <Flashcard decrement={decrementCardIndex} increment={incrementCardIndex} {...displayedCard}/>
       </div>
    )
}

export default FlashcardList