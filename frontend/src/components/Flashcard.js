import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getDeck } from '../api/apiCalls';
import Navbar from './Navbar';

import { Form, Modal, Button } from "react-bootstrap"
import { updateUserPoints } from "../api/apiCalls"
import { getFlashcard } from "../api/apiCalls"
import checkSimilarity from "../utils/checkStringSimilarity"

const FlashcardDiv = styled.div`
    display: flex;
    margin: 10% auto;
    justify-content:center;
    align-items:center;
    width: 400px;
    height: 50px;
    padding: 100px;
    background-color: white;
    border-radius: 20px;
    border: 5px solid rgba(0,0,0,0.6);
    font-size: 20px;
    position:relative;
`
const Answer = styled.div`
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

const ButtonDiv = styled.button`
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
width: 500px;
height: 50px;
padding: 100px;
background-color: white;
border-radius: 20px;
border: 5px solid rgba(0,0,0,0.6);
font-size: 20px;
`

const Flashcard = ({
    _id,
    question,
    answer,
    increment,
    decrement,
  }) => {
  
    const [isAnswered, setIsAnswered] = useState(false)
  const [userAnswer, setUserAnswer] = useState()
  const [accuracy, setAccuracy] = useState()
  const [showAnswerModal, setShowAnswerModal] = useState(false)
//   const { _id } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)

  const handleChange = (e) => {
    const { value } = e.target
    setUserAnswer(value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const accuracy = checkSimilarity(answer, userAnswer).toFixed(0)
      console.log('acc', userAnswer)
      setAccuracy(accuracy)
      console.log(accuracy)
      setIsAnswered(true)
      setShowAnswerModal(true)
      showScore(accuracy)
    } catch (error) {
      console.log(error)
    }
  }

  const closeHandler = () => {
    setShowAnswerModal(!showAnswerModal)
  }

  const updatePoints = async () => {
    try {
      if (accuracy > 85) {
        const response = await updateUserPoints(_id, {
          points: accuracy,
        })
      }

      closeHandler()
    } catch (error) {
      console.log(error)
    }
  }
  const showScore = (accuracy) => ({
    if(isAnswered){
        <Modal show={showAnswerModal} onHide={closeHandler}>
          <Modal.Body>Score: {accuracy}%</Modal.Body>
          <Button onClick={updatePoints}>Continue</Button>
        </Modal>
      
    }
  })
    
    

    return (
        <div>
        <FlashcardContainer>
        <Modal show={showAnswerModal} onHide={closeHandler}>
          <Modal.Body>Score: {accuracy}%</Modal.Body>
          <Button onClick={updatePoints}>Continue</Button>
        </Modal>
        <ArrowButton onClick={decrement}><FontAwesomeIcon icon={faArrowLeft} size="lg"/></ArrowButton>
        {!showAnswer && <FlashcardDiv>{question}</FlashcardDiv>}
        {showAnswer && <FlashcardBack>{answer}</FlashcardBack> }
        <ArrowButton onClick={increment}><FontAwesomeIcon icon={faArrowRight} size="lg"/></ArrowButton>
        </FlashcardContainer>
       <AnswerContainer>
       <ButtonDiv onClick={() => setShowAnswer(!showAnswer)}> {showAnswer ? "Hide Answer" : "Show Answer" }</ButtonDiv>
        <ButtonDiv onClick={handleSubmit}>Check Answer</ButtonDiv>
        
        <textarea maxlength="200" type="text" value={userAnswer} onChange={handleChange}></textarea>
        </AnswerContainer>
        </div>
    )
}

export default Flashcard