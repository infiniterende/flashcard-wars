import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'

import Navbar from './Navbar';

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
    background-color: rgba(0,0,0,0.5);
    background-attachment: fixed;
    background-position: auto, center top;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10%;
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
`

const MenuItem = styled.li`
    font-family: Helvetica Neue;
    font-size: 15px;
    letter-spacing: 1px; 
    text-transform: uppercase;
    list-style: none;
    margin: 20px;
    padding: 10px;
    height: 80px;
`

const Title = styled.li`
    font-weight: bold;
    font-size: 20px;
    font-family: Helvetica Neue;
    list-style:none;
    align-items: flex-start;
    padding-right: 200px;
    height: 80px;
`

const Header = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/flashwars.jpg) no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    background-position: center top;
    min-height: 100vh;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    position: relative;
    z-index: 10;
`   

const Subtitle = styled.div`
    font-size: 40px;
    font-weight: 600;
    font-family: Helvetica Neue;
    color: white;
    width: 500px;
    letter-spacing: 1px;
    line-height: 1.5;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
`
const Paragraph = styled.div`
    background-color: rgba(0,0,0,0.7);
    font-size: 20px;
    font-weight: 400;
    font-family: Helvetica Neue;
    color: lightblue;
    width: 500px;
    letter-spacing: 0.8px;
    line-height: 1;
    position: absolute;
`

const Home = () => {
    return (
     <Header>
        <Navbar />

        <Subtitle>Gamifying Study Habits

        <Paragraph>flash_wars is a digital platform that turns studying into a game. 
            compete to win badges and climb up the leaderboard. make memorizing facts more fun.
        </Paragraph>
        </Subtitle>
      
      
     </Header>
       
    )
}

export default Home