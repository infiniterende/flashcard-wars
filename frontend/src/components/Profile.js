import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import {Navigate, Link} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';

import Navbar from './Navbar'
import Deck from './Deck'

import {userProfile, verifyuser} from '../api/apiUsers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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

const Profile = ({}) => {
    const [profile, setProfile] = useState()
    const [id, setId] = useState()

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

    return (
        <div>
            <Navbar />
           {profile && 
           <ProfileContainer>
            <TopContainer>
             <ProfileImg><FontAwesomeIcon icon={faUser} size="2xl"/></ProfileImg>
             <ProfileInfoContainer>
            <NameBox>{profile.user.name}</NameBox> 
            <UserInfo>{profile.user.username}</UserInfo>
            
           <UserInfo>Rank: {profile.user.rank} </UserInfo>
           <UserInfo>Points:{profile.user.points}</UserInfo> 
           </ProfileInfoContainer>
           </TopContainer>
           <DeckContainer>{profile.user.decks.map(deck => <DeckBox><Deck id={deck._id} name={deck.name}/></DeckBox>)}
           </DeckContainer>
           </ProfileContainer>
        }
        </div>
        
    )
}

export default Profile