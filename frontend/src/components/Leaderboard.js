import React, { useEffect, useState } from "react"
import styled from "styled-components"

import Navbar from "./Navbar"

import { getLeaderboard } from "../api/apiCalls"

const User = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: lightblue;
  margin: 10px auto;
  width: 200px;
  border-radius: 10px;
  font-weight: 600;
`

const Container = styled.div`
  text-align: center;
  background-color: #75cfbb;
  width: 100%;
  height: 99vh;
`
const Leaderboard = () => {
  const [users, setUsers] = useState([])

  const fetchLeaderboard = async () => {
    const response = await getLeaderboard()
    setUsers(response)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <div>
      <Navbar alternate={true} />
      <Container>
        <img src="../../img/award.jpg" width="30%" alt="Leaderboard" />
        {users.map((user) => {
          return (
            <User>
              {" "}
              {user.rank}. {user.username} - {user.points} points{" "}
            </User>
          )
        })}
      </Container>
    </div>
  )
}

export default Leaderboard
