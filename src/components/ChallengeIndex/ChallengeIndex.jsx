import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { authRequest } from '../../lib/auth'
import './challengeIndex.scss'


function ChallengeIndex() {

  const [challengs, setChallenges] = useState([])

  async function getAllChallenges() {
    const response = await authRequest({method: "GET", url: 'http://127.0.0.1:8000/api/challenges/'})
    console.log(response.data)
    setChallenges(response.data)
  }

  useEffect(() =>{
    getAllChallenges()
  }, [])

  return (
    <div className='challenge-index'>
        <h1>All Challenges</h1>
        <div className='challenge-list'>
            {
            challengs.length
            ?
            challengs.map((challenge) => {
              return (
                <div key={challenge.id} className='challenge-card'>
                  <Link to={`/challenges/${challenge.id}`} key={challenge.id}> 
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                    <p>Duration: {challenge.start_date} to {challenge.end_date}</p>
                </Link>
                </div>
                
              )
            })
            :
            <h2>No Challenges</h2>
          }
        </div>
        
    </div>
  )
}

export default ChallengeIndex