import React, {useState} from 'react'
import {Navigate, Link} from 'react-router-dom'

import Navbar from './Navbar'

import {signin} from '../api/apiUsers';

import { Button, Form } from 'react-bootstrap';

const Signup = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [formData, setFormData] = useState({})

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const response = await signin({
                username: formData.username,
                password: formData.password
            })
            setLoggedIn(true)
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = async (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    let profile;
    loggedIn ? profile = <Navigate to="/profile" /> : 
    profile = (<div>
        <Navbar />
        <Form onSubmit={handleSubmit} className="signup">
            <Form.Group size="md">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" name="username" value={formData.username} 
            onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group size="md">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" name="password" value={formData.password} 
            onChange={handleChange}></Form.Control>
            </Form.Group>
            <Button type="submit">Sign Up</Button>
            <p>Not a user? Register <Link path="/signup">here</Link></p>
        </Form>

    </div>

    
)
    return (
        profile
    )
        
}

export default Signup