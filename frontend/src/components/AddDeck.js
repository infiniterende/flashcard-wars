import React, { useState, useEffect } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { createDeck} from "../api/apiCalls"
import { verifyuser } from "../api/apiUsers"

const AddDeck= ({ show, closeHandler }) => {
  const [deck, setDeck] = useState({})
  const [userId, setUserId] = useState()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await verifyuser()
    setUserId(response.user.id)
  }
  const handleChange = (e) => {
    setDeck((prevState) => ({...prevState, name: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createDeck(deck);
      console.log(response)
      closeHandler()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title> Add Deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="form-group"
            type="text"
            onChange={handleChange}
            value={deck.name}
            name="name"
          ></Form.Control>
        </Form.Group>
      </Modal.Body>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Add Deck
      </Button>
      <Button variant="secondary" onClick={closeHandler}>
        Close
      </Button>
    </Modal>
  )
}

export default AddDeck