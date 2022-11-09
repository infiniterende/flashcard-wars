import React, {useEffect, useState} from "react";
import styled from 'styled-components'

import Navbar from "./Navbar";

import { getLeaderboard } from "../api/apiCalls";

const User = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: lightblue;
    margin: 10px auto;
    width: 200px;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: 5px 5px 5px black;
`

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    const fetchLeaderboard = async () => {
        const response = await getLeaderboard();
        setUsers(response)
    }

    useEffect(() => {
        fetchLeaderboard()
    }, [])

    return (
        <div>
            <Navbar />
            {users.map(user => {
                return <User> {user.rank}. {user.username} - {user.points} points </User>
            })}
        </div>

    )
}

export default Leaderboard