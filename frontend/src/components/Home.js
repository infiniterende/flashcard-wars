import React from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"

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
  background-color: #7390fb;
  background-attachment: fixed;
  background-position: auto, center top;
  display: flex;
  justify-content: space-between;
  padding: 20px 10%;
  font-size: 20px;
  top: 0;
  z-index: 10;
  height: 99vh;
  position: relative;
`

const Menu = styled.ul`
  margin-left: 100px;
  display: flex;
  color: white;
  text-align: center;
  text-decoration: none;
  z-index: 101;
  position: relative;
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
  z-index: 101;
  position: relative;
`

const Title = styled.div`
  margin-top: 5px;
  font-weight: bold;
  font-size: 30px;
  font-family: Helvetica Neue;
  list-style: none;
  align-items: flex-start;
  padding-right: 200px;
  padding-top: 10px;
  height: 80px;
  position: relative;
  z-index: 100;
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
  transform: translate(-50%, -50%);
`
const Paragraph = styled.div`
  font-size: 40px;
  font-weight: 500;
  font-family: Arial;
  color: white;
  width: 500px;
  letter-spacing: 0.8px;
  line-height: 1;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
`

const Hero = styled.div`
  position: absolute;
  top: 25vh;
  transform: translateX(30%);
  z-index: 80;
`
const Header = styled.div`
  width: 100%;
  height: 99vh;
  z-index: 70;
  position: absolute;
  background-color: rgb(31, 209, 216);
  transform: skewY(10deg) translateY(-80%);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
`

const Logo = styled.div`
  position: relative;
  z-index: 20;
`

const Text = styled.div`
  position: absolute;
  right: 10%;
  top: 25vh;
  color: #eee;
  z-index: 10;
`

const Heading = styled.div`
  font-size: 50px;
`

const Subtext = styled.div`
  font-size: 30px;
`

const Home = () => {
  return (
    <div>
      <Nav>
        <Logo>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <Title>flashwars</Title>
          </Link>
        </Logo>

        <Menu>
          <Link
            style={{ textDecoration: "none", color: "#E64420" }}
            to="/login"
          >
            <MenuItem>Log In</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#E64420" }}
            to="/decks"
          >
            <MenuItem>Decks</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#E64420" }}
            to="/leaderboard"
          >
            <MenuItem>Leaderboard</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#E64420" }}
            to="/compete"
          >
            <MenuItem>Compete </MenuItem>
          </Link>
        </Menu>
      </Nav>

      <Hero>
        <img className="header-img" src="../img/submain.png" />
      </Hero>
      <Text>
        <Heading>Make memorizing fun</Heading>
        <Subtext>
          <p>...through competing with friends</p>
          <p>...using speech to text translation</p>
          <p>...winning rewards and ranking on leaderboard</p>
        </Subtext>
      </Text>
    </div>
  )
}

export default Home
