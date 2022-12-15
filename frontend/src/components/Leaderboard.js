import React, { useEffect, useState } from "react"
import styled from "styled-components"

import Navbar from "./Navbar"

import Divider from "@mui/material/Divider"
import { Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAward } from "@fortawesome/free-solid-svg-icons"

import { getLeaderboard } from "../api/apiCalls"

const User = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 10px auto;
  width: 300px;
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

        <Divider>
          <h3>Leaderboard</h3>
        </Divider>

        {users.map((user) => {
          return (
            <User>
              {" "}
              <Typography sx={{ mb: 1, mr: 1 }}>
                <FontAwesomeIcon icon={faAward} size="lg" />
              </Typography>
              {user.username} - {user.points}
            </User>
          )
        })}
      </Container>
    </div>
  )
}

export default Leaderboard
