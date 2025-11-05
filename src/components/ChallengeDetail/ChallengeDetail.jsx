import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router"
import ProgressForm from "./ProgressForm"
import ProgressList from "./ProgressList"
import { authRequest } from "../../lib/auth"




function ChallengeDetail({user}) {
    
    const {challengeId} = useParams()
    const navigate = useNavigate()
    const [challenge, setChallenge] = useState({})
    const [errors, setErrors] = useState(null)
    const [joinMessage, setJoinMessage] = useState('')
    const [leaveMessage, setLeaveMessage] = useState('')


    const userParticipation = challenge.participations?.find(
        participation => participation.user === user.id
    )

    async function deleteChallenge() {
        if (window.confirm("Are you sure you want to delete this challenge?")) {
            try {
                const response = await authRequest({method: 'DELETE', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/`})
                alert('Challenge deleted successfuly!')
                navigate('/challenges')
            } catch (error) {
                alert('Error deleting challenge')
                console.log('Error deleting challenge:', error)
            }
        }
        
    }

    async function leaveChallenge(){
        try {
            const response = await authRequest({method: 'DELETE', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/leave/`})
            setLeaveMessage(response.data.message)
            setJoinMessage('')
            getSingleChallenge()
        } catch (error) {
            console.log('Error leaving challenge:', error)
        }
    }

    async function joinChallenge() {
    try {
        const response = await authRequest({method: 'POST', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/participations/`, data: {}})
        setJoinMessage("Successfully joined challenge!")
        getSingleChallenge()
    } catch (error) {
        console.log('full error:', error.response)
        setJoinMessage("Error joining challenge")
    }
}

    async function getSingleChallenge() {
        try{
            const response = await authRequest({method: 'GET', url: `http://127.0.0.1:8000/api/challenges/${challengeId}/`})
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

    function handleProgressSaved(){
        getSingleChallenge()
    }

    if (errors) {
        return <h3>{errors}</h3>
    }

  return (
    <div>
        <h1>{challenge.title}</h1>
        <p>{challenge.description}</p>
        <p>Duration: {challenge.start_date} to {challenge.end_date}</p>
        <p>Created by: User {challenge.created_by}</p>

        

        {!userParticipation && (
            <div>
                <button onClick={joinChallenge}>Join Challenge!</button>
                {joinMessage && <p>{joinMessage}</p> }
            </div>
        )}

        {leaveMessage}
        
        {userParticipation && (
            <div>
                <ProgressForm 
                    participation={userParticipation}
                    handleProgressSaved={handleProgressSaved}
                />
                <ProgressList progress={userParticipation.progress} />

                <button onClick={leaveChallenge} >Leave Challenge</button>
            </div>
        )}

        
        
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

        {challenge.created_by === user.id && (
            <div>
                <button onClick={deleteChallenge}>Delete Challenge</button>
            </div>
        )}
    </div>
  )
}

export default ChallengeDetail