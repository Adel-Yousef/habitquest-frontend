import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router"




function ChallengeDetail() {
    
    const {challengeId} = useParams()
    const [challenge, setChallenge] = useState({})
    const [errors, setErrors] = useState(null)
    const [joinMessage, setJoinMessage] = useState('')

    async function joinChallenge() {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/challenges/${challengeId}/participations/`, {})
        setJoinMessage("Successfully joined challenge!")
        getSingleChallenge()
    } catch (error) {
        console.log('full error:', error.response)
        setJoinMessage(error.response?.data?.error || "Error joining challenge")
    }
}

    async function getSingleChallenge() {
        try{
            const response = await axios.get(`http://127.0.0.1:8000/api/challenges/${challengeId}/`)
            console.log(response.data)
            setChallenge(response.data)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.error)
        }
        
    }

    useEffect(() => {
        getSingleChallenge()
    }, [])

    if (errors) {
        return <h3>{errors}</h3>
    }

  return (
    <div>
        <h1>{challenge.title}</h1>
        <p>{challenge.description}</p>
        <p>Duration: {challenge.start_date} to {challenge.end_date}</p>
        <p>Created by: User {challenge.created_by}</p>

        <button onClick={joinChallenge}>Join Challenge!</button>
        {joinMessage && <p>{joinMessage}</p> }
        <div>
            <h3>Participations:</h3>
            {
                challenge.participations
                ?
                challenge.participations.map(participation =>{
                return (
                    <p key={participation.id}>
                        User {participation.user} - Joined: {participation.join_date}
                    </p>
                )
            })
            :
            null
            } 
        </div>

        <Link to={`/challenges/${challenge.id}/edit`} >Edit Challenge</Link>
    </div>
  )
}

export default ChallengeDetail