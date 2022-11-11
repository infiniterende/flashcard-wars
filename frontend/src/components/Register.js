import React, {useState} from 'react'
import {Navigate, Link} from 'react-router-dom'

import Navbar from './Navbar'

import {signup} from '../api/apiUsers';

import { Button, Form } from 'react-bootstrap';

const Register = ({}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [formData, setFormData] = useState({})

    const handleSubmit = async({name, value}) => {
        try {
            const response = await signup({
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
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="name" value={formData.name} 
                onChange={handleChange}>
                    
                </Form.Control>
                </Form.Group>
                <Form.Group size="md">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" value={formData.password} 
                onChange={handleChange}></Form.Control>
                </Form.Group>
                <Button>Sign Up</Button>
                
            </Form>

        </div>
        
    )
}

export default Register