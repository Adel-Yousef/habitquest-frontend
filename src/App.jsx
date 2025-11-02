import React from "react"
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from "react-router"


import ChallengeIndex from "../components/ChallengeIndex/ChallengeIndex"
import NavBar from "../components/NavBar/NavBar"
import HomePage from "../components/HomePage/HomePage"
import ChallengeDetail from "../components/ChallengeDetail/ChallengeDetail"





function App() {

  async function makeRequest() {
    const response = await axios.get('http://127.0.0.1:8000/api/')
    console.log(response)
    
  }
  makeRequest()

  async function makePostRequest() {
    const response = await axios.post('http://127.0.0.1:8000/api/', {
      messageFormAppJsx: 'Hey i made a post request! 🥳'
    })
    console.log(response)
    
  }
  makePostRequest()

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<ChallengeIndex />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
      </Routes>
    </Router>
  )
}

export default App