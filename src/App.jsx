import React, { useState } from "react"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router"


import ChallengeIndex from "./components/ChallengeIndex/ChallengeIndex"
import NavBar from "./components/NavBar/NavBar"
import HomePage from "./components/HomePage/HomePage"
import ChallengeDetail from "./components/ChallengeDetail/ChallengeDetail"
import ChallengeForm from "./components/ChallengeForm/ChallengeForm"
import Dashboard from "./components/DashBoard/DashBoard"
import Login from "./components/Auth/Login"
import SignUp from "./components/Auth/Signup"
import ProtectedRoute from "./components/Auth/ProtectedRoute"

import {getUserFromToken} from "./lib/auth"



function App() {

  const [user, setUser] = useState(getUserFromToken())

  async function makeRequest() {
    const response = await axios.get('http://127.0.0.1:8000/api/')
    console.log(response)
    
  }
  // makeRequest()

  async function makePostRequest() {
    const response = await axios.post('http://127.0.0.1:8000/api/', {
      messageFormAppJsx: 'Hey i made a post request! 🥳'
    })
    console.log(response)
    
  }
  // makePostRequest()

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={
          <ProtectedRoute>
             <ChallengeIndex />
          </ProtectedRoute>
          }
        />
        <Route path="/challenges/:challengeId" element={
          <ProtectedRoute>
            <ChallengeDetail user={user} />
          </ProtectedRoute>
          }
        />
        <Route path="/challenges/new" element={
          <ProtectedRoute>
            <ChallengeForm user={user} />
          </ProtectedRoute>
          
          }
        />
        <Route path="/challenges/:challengeId/edit" element={
          <ProtectedRoute>
            <ChallengeForm user={user}/>
          </ProtectedRoute>
          
          } 
        />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard user={user}/>
          </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App