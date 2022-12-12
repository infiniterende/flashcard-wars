import React, {useEffect, useState, useRef} from 'react'
import socket from '../socket';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import { verifyuser } from '../api/apiUsers';
import { getAllDecks } from '../api/apiCalls';


import Deck from './Deck';
import DeckList from './DeckList';
import FlashcardList from './FlashcardList';
import Navbar from './Navbar';

import checkSimilarity from "../utils/checkStringSimilarity"

import Button from '@mui/material/Button';
const ButtonDiv = styled.button`
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid teal;
`

const ButtonContainer = styled.div`
  display:flex;
  justify-content: center;
  margin: 20px;
`

const DeckContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

const Container = styled.div`
  text-align: center;
`
const Game = () => {
  const ENDPOINT = 'http://localhost:3001'
  const [socketConnected, setSocketConnected] = useState(false)
  const [user, setUser] = useState()
  const [isGame, setIsGame] = useState(false)
  const [decks, setDecks] = useState()
  const [pickedDeck, setPickedDeck] = useState()
  const [pickedUser, setPickedUser] = useState(false)
  const socketRef = useRef(null)
 
    const fetchUser = async () => {
      try {
        const response = await verifyuser();
        setUser(response)
      } catch(error) {
        console.log(error)
      }
    }

    const socket = useRef()
    const setupSocket = () => {
      const token = localStorage.getItem("token");
      if (token) {
        socket.current = io("http://localhost:3001", {
          query: {
            token: localStorage.getItem("token"),
          },
        });
  
  
        socket.current.on("connect", () => {
          console.log('connect')
        });
        console.log(socket.current)
      }
    };
  
    useEffect(() => {
      setupSocket();
    }, []);
  


    useEffect(() => {
      fetchUser()
    }, [])

    const playGame = () => {
      setIsGame(true)
      socket.current.emit("setup", user)
      socket.current.on("pick user", (randomUser) => {
        setPickedUser(randomUser)
        console.log("pick", pickedUser)
      })
      if(user._id === pickedUser._id) {
        console.log("conn")
      }
    
    }
    
    const pickDeck = (deck) => {
      setPickedDeck(deck)
    }

    useEffect(() => {
      showDecks()
    }, [])

    const showDecks = async () => {
        const response = await getAllDecks();
        setDecks(response)
    }

    return (
      <div>
        <Navbar />
        <Container>
        <img src="../../img/compete.jpg" width="50%" />
        <h4>Compete against your friends!</h4>
        </Container>
        <ButtonContainer>
        <Button 
              variant="contained"
              sx={{p:2}}
              style={{backgroundColor:"#455964"}} onClick={playGame}>
      Play Game 
      </Button>
      {/* {!isGame  && <ButtonDiv onClick={playGame}>Play Game</ButtonDiv> } */}
      </ButtonContainer>
      <DeckContainer>
      {pickedUser && decks.map(deck => ( <Deck id={deck._id} name={deck.name} />))}
         
         </DeckContainer>
      </div>
    )
    

    
}

export default Game