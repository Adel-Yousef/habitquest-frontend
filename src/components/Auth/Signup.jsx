// src/SignUp.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import './Signup.scss'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://127.0.0.1:8000/api/signup/', { username, password, email })
      navigate('/login')
    } catch (err) {
      console.error(err)
      setMessage('Signup failed')
    }
  }

  return (
    <div className='signup-page'>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Sign Up</button>

        {message && (
          <p>{message}</p>
        )}

        <p>Already have an account? <Link to="/login" >Login</Link></p>
      </form>
    </div>
  )
}