import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import { verifyuser } from '../api/apiUsers';
const Button = styled.button`
    background: transparent;
    background-color: #eee;
    border-radius: 5px;
    border-color: white;
    padding: 0.8em;
    top: 15px;
    position: absolute;
    text-transform: uppercase;
    letter-spacing: 1px;

`

const Nav = styled.nav`
    background-attachment: fixed;
    background-position: auto, center top;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10%;
    font-size: 20px;
    top: 0;
    z-index: 1;
    height: 70px;
    position: relative;
    background-color:  #7390FB;
`



const Menu = styled.ul`
    padding-top: 50px;
    display: flex;
    color: white;
    align-items: center;
    text-align: center;
    text-decoration: none;
    margin-left: 150px;
`

const MenuItem = styled.li`
    font-family: Helvetica Neue;
    font-size: 15px;
    letter-spacing: 1px; 
    text-transform: uppercase;
    list-style: none;
    margin: 20px;
    padding: 10px;
    height: 70px;
    color: white;
`

const Title = styled.div`
    margin-left: 20px;
    margin-top: 40px;
    font-weight: bold;
    font-size: 30px;
    font-family: Helvetica Neue;
    list-style:none;
    align-items: flex-start;
    padding-right: 200px;
    height: 80px;
`

const Top = styled.div`
    
    
`

const Navbar = () => {
    const [user, setUser] = useState()
    const fetchUser = async () => {
        const response  = await verifyuser();
        setUser(response)

    }

    useEffect(() => {
        fetchUser()
    }, [])

    let customLink = user ?  (<Link style={{ textDecoration: 'none', color: '#E64420' }} to="/profile"><MenuItem>Profile</MenuItem></Link>) : (<Link style={{ textDecoration: 'none', color: '#E64420' }} to="/login" ><MenuItem>Log In</MenuItem></Link>)
    return (
    <Nav>
        <Top>
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><Title>flashwars</Title></Link>
        </Top>
    <Menu>
      {customLink}
        <Link style={{ textDecoration: 'none', color: '#E64420' }} to="/decks" ><MenuItem>Decks</MenuItem></Link>
        {/* <Link style={{ textDecoration: 'none', color: '#E64420' }} to="/leaderboard"><MenuItem>Leaderboard  </MenuItem></Link> */}
       <Link style={{ textDecoration: 'none', color: '#E64420' }} to="/compete"><MenuItem>Compete  </MenuItem></Link>
        
    </Menu>
</Nav>)
}

export default Navbar