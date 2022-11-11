import React from 'react';
import {Link} from 'react-router-dom'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

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
    background-color: rgba(0,0,0,0.6);
    background-attachment: fixed;
    background-position: auto, center top;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10%;
    font-size: 20px;
    top: 0;
    z-index: 999;
    height: 50px;
    position: relative;
`



const Menu = styled.ul`
    padding-top: 50px;
    display: flex;
    color: white;
    align-items: center;
    text-align: center;
    text-decoration: none;
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
    font-weight: bold;
    font-size: 20px;
    font-family: Helvetica Neue;
    list-style:none;
    align-items: flex-start;
    padding-right: 200px;
    padding-top: 10px;
    height: 80px;
`

const Navbar = () => {
    return (
    <Nav>
    <Menu>
        <Title>flash_wars</Title>
       <Link style={{ textDecoration: 'none', color: 'white' }} to="/login" ><MenuItem>Log In</MenuItem></Link>
       <Link style={{ textDecoration: 'none', color: 'white' }} to="/profile"><MenuItem>Profile</MenuItem></Link>
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/decks" ><MenuItem>Decks</MenuItem></Link>
       <Link style={{ textDecoration: 'none', color: 'white' }} to="/compete"><MenuItem>Compete  </MenuItem></Link>
        
    </Menu>
</Nav>)
}

export default Navbar