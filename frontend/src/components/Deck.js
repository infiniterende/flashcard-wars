import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDeck, getFlashcards } from "../api/apiCalls";

import Navbar from "./Navbar";
import Flashcard from "./Flashcard";

import Button from "@mui/material/Button";

const Deck = ({ id, name }) => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards(id);
  }, [id]);

  const fetchFlashcards = async (id) => {
    try {
      const response = await getFlashcards(id);
      setFlashcards((prevState) => [...prevState, response.flashcards]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{ p: 2, m: 1 }}
        style={{ backgroundColor: "#455964" }}
      >
        {" "}
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/decks/${id}`}
        >
          {name}
        </Link>
      </Button>
    </div>
  );
};

export default Deck;
