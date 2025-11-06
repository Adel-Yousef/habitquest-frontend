import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router"
import ProgressForm from "./ProgressForm"
import ProgressList from "./ProgressList"
import { authRequest } from "../../lib/auth"
import "./ChallengeDetail.scss"



function ChallengeDetail({user}) {
    
    const {challengeId} = useParams()
    const navigate = useNavigate()
    const [challenge, setChallenge] = useState({})
    const [errors, setErrors] = useState(null)
    const [joinMessage, setJoinMessage] = useState('')
    const [leaveMessage, setLeaveMessage] = useState('')


    const userParticipation = challenge.participations?.find(
        participation => participation.user?.id === Number(user.user_id)
    )

    if (!user) {
        return <h3>Loading user...</h3>;
    }


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
    console.log("user", user.user_id)
    console.log(challenge.created_by)
  return (
    <div className="challenge-detail">
        <h1>{challenge.title}</h1>
        <p>{challenge.description}</p>
        <p className="duration">Duration: {challenge.start_date} to {challenge.end_date}</p>
        <p className="creator">Created by: User {challenge.created_by}</p>

        

        {!userParticipation && (
            <div className="button-group">
                <button onClick={joinChallenge}>Join Challenge!</button>
                {joinMessage && <p className="message">{joinMessage}</p> }
            </div>
        )}

        {leaveMessage}
        
        {userParticipation && (
            <div className="button-group">
                <ProgressForm 
                    participation={userParticipation}
                    handleProgressSaved={handleProgressSaved}
                />
                <ProgressList className='progress-list' progress={userParticipation.progress} />
                
                <button className="leave" onClick={leaveChallenge} >Leave Challenge</button>
            </div>
        )}

        
        
        <div className="participations">
            <h3>Participations:</h3>
            {
                challenge.participations
                ?
                challenge.participations.map(participation =>{
                return (
                    <p key={participation.id}>
                        {participation.user.username} - Joined: {participation.join_date}
                    </p>
                )
            })
            :
            null
            } 
        </div>

        <Link to={`/challenges/${challenge.id}/edit`} >Edit Challenge</Link>

        {challenge.created_by === Number(user.user_id) && (
            <div className="button-group">
                <button className="delete" onClick={deleteChallenge}>Delete Challenge</button>
            </div>
        )}
    </div>
  )
}

export default ChallengeDetail