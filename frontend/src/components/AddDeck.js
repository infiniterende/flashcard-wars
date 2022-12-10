import React, { useState, useEffect } from "react"
import { Modal} from "react-bootstrap"
import { createDeck} from "../api/apiCalls"
import { verifyuser } from "../api/apiUsers"

import * as Mui from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
        {/* <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="form-group"
            type="text"
            onChange={handleChange}
            value={deck.name}
            name="name"
          ></Form.Control>
        </Form.Group> */}
          <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
            Add Deck
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Deck Name"
              name="name"
              autoFocus
              onChange={handleChange}
            />
           
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      </Modal.Body>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              style={{backgroundColor:"#7390FB"}}
              onClick={handleSubmit}
            >
              Add Deck
            </Button>
      <Button 
              variant="contained"
              
              style={{backgroundColor:"#455964"}} onClick={closeHandler}>
        Close
      </Button>
    </Modal>
  )
}

export default AddDeck