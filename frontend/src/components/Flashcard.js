import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { getDeck } from "../api/apiCalls";
import Navbar from "./Navbar";

import { Form, Modal, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";

import { updateUserPoints } from "../api/apiCalls";
import { getFlashcard } from "../api/apiCalls";
import checkSimilarity from "../utils/checkStringSimilarity";

import { verifyuser } from "../api/apiUsers";
const FlashcardDiv = styled.div`
  display: flex;
  margin: 10% auto;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 50px;
  padding: 100px;
  background-color: white;
  border-radius: 20px;
  border: 5px solid rgba(0, 0, 0, 0.6);
  font-size: 20px;
  position: relative;
`;
const Answer = styled.div`
  padding: 100px;
  width: 200px;
  height: 50px;
  align-items: center;
  margin: 50px auto;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
`;

const FlashcardContainer = styled.div`
  display: flex;
  width: 500px;
  margin: 0 auto;
  position: relative;
  justify-content: space-around;
  align-items: center;
  perspective: 1000px;
`;
const ArrowButton = styled.button`
  border-radius: 50%;
  border: 1px solid black;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  margin: 10px;
`;

const ButtonDiv = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #455964;
  padding: 20px;
  display: flex;
  margin-right: 10px;
  outline: none;
  border: none;
  font-weight: 600;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin: 20px;
`;

const FlashcardBack = styled.div`
  display: flex;
  margin: 10% auto;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 50px;
  padding: 100px;
  background-color: white;
  border-radius: 20px;
  border: 5px solid rgba(0, 0, 0, 0.6);
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const Flashcard = ({ _id, user, question, answer, increment, decrement }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState();
  const [accuracy, setAccuracy] = useState();
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [winner, setWinner] = useState([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [gameWinner, setGameWinner] = useState([]);
  const [showGameWinner, setShowGameWinner] = useState(false);
  const socket = useRef();

  const setupSocket = () => {
    const token = localStorage.getItem("token");
    if (token) {
      socket.current = io("http://localhost:3001", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      socket.current.on("connect", () => {
        console.log("connect");
      });
      console.log(socket.current);
      console.log("flashcard");
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setUserAnswer(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accuracy = checkSimilarity(answer, userAnswer).toFixed(0);
      setAccuracy(accuracy);
      setIsAnswered(true);
      setShowAnswerModal(true);
      showScore(accuracy);
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    setShowAnswerModal(!showAnswerModal);
  };

  const closeGame = () => {
    setShowGameWinner(false);
  };

  const getWinner = () => {
    let cardScore = { card: _id, score: accuracy, user: user.user };
    socket.current.emit("get score", cardScore);
    console.log("cardscore", cardScore);
    console.log("get score");
    console.log("socket", socket.current);
    socket.current.on("get winner", (cardWinner) => {
      setWinner({ ...cardWinner });
      if (cardWinner) {
        console.log("true");
        setShowWinnerModal(true);
      }
    });
  };

  const getGameWinner = () => {
    console.log("game winer");
    socket.current.on("game winner", (gameWinner) => {
      console.log("socket game end");
      setGameWinner([...gameWinner]);
      setShowGameWinner(true);
    });
  };
  const updatePoints = async () => {
    closeHandler();
  };

  const closeWinnerModal = () => {
    setShowWinnerModal(false);
  };

  const showScore = (accuracy) => ({
    if(isAnswered) {
      <Modal show={showAnswerModal} onHide={closeHandler}>
        <Modal.Body>Score: {accuracy}%</Modal.Body>
        <Button>Continue</Button>
      </Modal>;
    },
  });

  return (
    <div>
      <FlashcardContainer>
        <Modal show={showAnswerModal} onHide={closeHandler}>
          <Modal.Body>Score: {accuracy}%</Modal.Body>
          <Button onClick={updatePoints}>Continue</Button>
        </Modal>
        <Modal show={showWinnerModal} onHide={closeWinnerModal}>
          <Modal.Body> {winner.username} wins!</Modal.Body>
          <Button onClick={closeWinnerModal}>Continue</Button>
        </Modal>
        <Modal show={showGameWinner} onHide={showGameWinner}>
          <Modal.Body>
            {" "}
            {gameWinner[1]} wins with {gameWinner[0]} points!
          </Modal.Body>
          <Button onClick={closeWinnerModal}>Continue</Button>
        </Modal>
        <ArrowButton onClick={decrement}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </ArrowButton>
        {!showAnswer && <FlashcardDiv>{question}</FlashcardDiv>}
        {showAnswer && <FlashcardBack>{answer}</FlashcardBack>}
        <ArrowButton onClick={increment}>
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </ArrowButton>
      </FlashcardContainer>

      <AnswerContainer>
        <TextField
          sx={{ width: "30%" }}
          multiline
          minRows={6}
          value={userAnswer}
          onChange={handleChange}
        />
      </AnswerContainer>
      <ButtonGroup>
        <ButtonDiv onClick={() => setShowAnswer(!showAnswer)}>
          {" "}
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </ButtonDiv>
        <ButtonDiv onClick={handleSubmit}>Check Answer</ButtonDiv>
        <ButtonDiv onClick={getWinner}>Get Winner</ButtonDiv>
        <ButtonDiv onClick={getGameWinner}>End Game</ButtonDiv>
      </ButtonGroup>
    </div>
  );
};

export default Flashcard;
