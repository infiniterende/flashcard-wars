import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import {Navigate} from 'react-router-dom'
// import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar'
import Deck from './Deck'
import AddDeck from './AddDeck';

import {userProfile, verifyuser} from '../api/apiUsers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

const ButtonContainer = styled.div`
    display:flex;
    justify-content:center;
`
const ButtonDiv = styled.button`
    border-radius: 10px;
    color: white;
    background-color: #455964;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    padding: 50px;
    width: 250px;
    height: 50px;
    display:flex;
    justify-content: center;
    align-content: center;
    align-items:center;
    margin-right: 10px;
    outline: none;
    border: none;
`

const ProfileContainer = styled.div`
    display:flex;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    position:relative;
`

const TopContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding:40px;
    
`

const ProfileInfoContainer = styled.div`
    display:flex;
    flex-direction: column;
`
const ProfileImg = styled.div`
    font-size: 2em;
    padding: 20px;
    border-radius: 50%;
    border: 2px solid #333;
    width: 100px;
    height: 100px;
    margin: 0 20px;
`
const NameBox = styled.div`
    font-size: 36px;
    font-weight: 600;
`

const UserInfo = styled.div`
    font-size: 20px;    
`
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

const Profile = ({}) => {
    const [profile, setProfile] = useState()
    const [id, setId] = useState()
    const [showCreateModal, setShowCreateModal] = useState(false);


    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        try {
            const response = await userProfile()
            console.log('r', response)
            setProfile(response)
        }
        catch(error) {
            console.log(error)
        }
    
    }

    const handleCloseModal = () => setShowCreateModal(false)
    const handleShowModal = () => setShowCreateModal(true)

    return (
        <div>
            <Navbar />
           {profile && 
           <ThemeProvider theme={theme}>
           <Container component="main" maxWidth="xl">
             <CssBaseline />
        
             <Box sx={{marginTop: 2, display:'flex', flexDirection:'row', justifyContent: 'space-around'}}>
             <Avatar sx={{width: 100, height: 100, bgcolor:'#7390FB', fontSize: '3em'}}>{profile.user.name[0]}</Avatar>
             <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography component='h4'>
                    {profile.user.name}
                </Typography>
                <Typography component='p'>
                    {profile.user.username}
                </Typography>
                <Typography component='p'>
                    {profile.user.rank}
                </Typography>
                <Typography component='p'>
                    {profile.user.points}
                </Typography>
             </Box>
             
             </Box>
             
             {/* <ProfileInfoContainer>
            <NameBox>{profile.user.name}</NameBox> 
            <UserInfo>{profile.user.username}</UserInfo>
            
           <UserInfo>Rank: {profile.user.rank} </UserInfo>
           <UserInfo>Points:{profile.user.points}</UserInfo> 
           </ProfileInfoContainer> */}
           <ButtonContainer>
           <ButtonDiv onClick={handleShowModal}>
        Create Deck
      </ButtonDiv>
      {showCreateModal && (
        <AddDeck
          show={showCreateModal}
          closeHandler={handleCloseModal}
        />
      )}
      </ButtonContainer>
           <DeckContainer>
           
            {profile.user.decks.map(deck => <DeckBox><Deck id={deck._id} name={deck.name}/></DeckBox>)}
           </DeckContainer>
           </Container>
           </ThemeProvider>
        }
        </div>
        
    )
}

export default Profile