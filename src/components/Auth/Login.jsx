import React, { useState } from "react"
import axios from "axios"
import { saveTokens, getUserFromToken } from "../../lib/auth"
import { useNavigate, Link } from "react-router"

export default function Login({ setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", { username, password })
      saveTokens(res.data.access, res.data.refresh)
      const tokenData = getUserFromToken()
    //   so i get the username and use it in the dashboard
      setUser({
        ...tokenData,
        username: username
      })
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
    
    
  )
}