import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import styled from "styled-components"

import Navbar from "./Navbar"
import Flashcard from "./Flashcard"
import AddFlashcard from "./AddFlashcard"

import { getDeck } from "../api/apiCalls"
import { verifyuser } from "../api/apiUsers"

import Divider from "@mui/material/Divider"

const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const DeckBox = styled.div`
  color: white;
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
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  padding: 40px;
`

const ButtonDiv = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #7390fb;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  padding: 40px;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-right: 10px;
  outline: none;
  border: none;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([])
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [displayedCard, setDisplayedCard] = useState()
  const [cardIndex, setCardIndex] = useState(0)
  const [deck, setDeck] = useState()
  const [isDeckLoading, setIsDeckLoading] = useState(false)
  const handleCloseModal = () => setShowCreateModal(false)
  const handleShowModal = () => setShowCreateModal(true)
  const socket = useRef()
  const [user, setUser] = useState()
  const setupSocket = () => {
    const token = localStorage.getItem("token")
    if (token) {
      socket.current = io("http://localhost:3001", {
        query: {
          token: localStorage.getItem("token"),
        },
      })

      socket.current.on("connect", () => {
        console.log("connect")
      })
      socket.current.emit("setup", user)
      console.log("socket", socket.current)
    }
  }

  const fetchUser = async () => {
    try {
      const response = await verifyuser()
      setUser(response)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  useEffect(() => {
    setupSocket()
  }, [])

  useEffect(() => {
    fetchFlashcards(id)
  }, [id])

  const fetchFlashcards = async (id) => {
    try {
      const response = await getDeck(id)
      setFlashcards(response.flashcards)
      setDeck(response.deck[0])
      setLoading(true)
    } catch (error) {
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
      <Navbar />
      <Divider>
        <Title>{loading && deck.name}</Title>
      </Divider>

      {showCreateModal && (
        <AddFlashcard
          show={showCreateModal}
          deckId={id}
          closeHandler={handleCloseModal}
        />
      )}
      {isDeckLoading && (
        <Flashcard
          user={user}
          decrement={decrementCardIndex}
          increment={incrementCardIndex}
          {...displayedCard}
        />
      )}

      <Container>
        <ButtonDiv onClick={handleShowModal}>Create Flashcard</ButtonDiv>
      </Container>
    </div>
  )
}

export default FlashcardList
