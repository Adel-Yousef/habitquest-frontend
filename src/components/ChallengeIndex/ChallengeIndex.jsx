import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { authRequest } from '../../lib/auth'


function ChallengeIndex() {

  const [challenegs, setChallenges] = useState([])

  async function getAllChallenges() {
    const response = await authRequest({method: "GET", url: 'http://127.0.0.1:8000/api/challenges/'})
    console.log(response.data)
    setChallenges(response.data)
  }

  useEffect(() =>{
    getAllChallenges()
  }, [])

  return (
    <div>
        <h1>All Challenges</h1>
        {
          challenegs.length
          ?
          challenegs.map((challenge) => {
            return (
              <Link to={`/challenges/${challenge.id}`} key={challenge.id}> 
                <div>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                  <p>Duration: {challenge.start_date} to {challenge.end_date}</p>
                </div>
              </Link>
            )
          })
          :
          <h2>No Challenges</h2>
        }
    </div>
  )
}

export default ChallengeIndex