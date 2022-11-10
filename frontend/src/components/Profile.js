import React, {useState} from 'react'
import {Navigate, Link} from 'react-router-dom'

import Navbar from './Navbar'

import {signin} from '../api/apiUsers';

import { Button, Form } from 'react-bootstrap';

const Profile = ({}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [formData, setFormData] = useState({})

    const submitLogin = async({name, value}) => {
        try {
            const response = await signin({
                [name]: value 
            })
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = async ({name, value}) => {
        setFormData({[name]: value})
    }

    const handleSubmit = async() => {

    }
    return (
        <div>
            <Navbar />
            <Form onSubmit={handleSubmit} className="login">
                <Form.Group size="md">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" value={formData.username} 
                onChange={handleChange}></Form.Control>
                </Form.Group>

                <Form.Group size="md">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" value={formData.password} 
                onChange={handleChange}></Form.Control>
                </Form.Group>
                <Button>Login</Button>
                <p>Not a user? Register <Link path="/signup">here</Link></p>
            </Form>

        </div>
        
    )
}

export default Profile