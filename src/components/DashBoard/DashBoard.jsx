import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import { authRequest } from "../../lib/auth"
import "./DashBoard.scss"

function Dashboard({user}) {
    const [username, setUsername] = useState('')
    const [myChallenges, setMyChallenges] = useState([])
    const [myParticipations, setMyParticipations] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)


    async function getUsername() {
        try {
            const response = await authRequest({
                method: "GET",
                url: "http://127.0.0.1:8000/api/username/"
            })
            setUsername(response.data.username)
        } catch (error) {
            console.log('error fetching username:', error)
        }
    }

    async function getMyChallenges() {
        try {
            const response = await authRequest({method:'GET', url: 'http://127.0.0.1:8000/api/my-challenges/'})
            setMyChallenges(response.data)
        } catch (error) {
            console.log('Error fetching my challenges:', error)
        }
    }

    async function getMyParticipations() {
        try {
            const response = await authRequest({method: "GET", url: 'http://127.0.0.1:8000/api/my-participations/'})
            setMyParticipations(response.data)
        } catch (error) {
            console.log('Error fetching my participations:', error)
        }
    }

    async function loadDashboard() {
        setLoading(true)
        try {
            await Promise.all([getUsername(),getMyChallenges(), getMyParticipations()])
        } catch (error) {
            setErrors("Error loading dashboard")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDashboard()
    }, [])

    if (loading) {
        return <h3>Loading dashboard...</h3>
    }

    if (errors) {
        return <h3>{errors}</h3>
    }
    console.log("User prop in Dashboard:", user)

    return (
        <div className="dashboard">
            <h1>My Dashboard</h1>
            <h2>Hello {username}</h2>
            <div className="section">
                <h2>Challenges I Created</h2>
                {myChallenges.length === 0 ? (
                    <p>You haven't created any challenges yet.</p>
                ) : (
                    myChallenges.map(challenge => (
                        <div className="challenge-card" key={challenge.id}>
                            <h3>
                                <Link to={`/challenges/${challenge.id}`}>
                                    {challenge.title}
                                </Link>
                            </h3>
                            
                        </div>
                    ))
                )}
                
            </div>

            <div className="section">
                <h2>Challenges I Joined</h2>
                {myParticipations.length === 0 ? (
                    <p>You haven't joined any challenges yet.</p>
                ) : (
                    myParticipations.map(participation => (
                        <div className="challenge-card" key={participation.id}>
                            <h3>
                                <Link to={`/challenges/${participation.challenge}`}>
                                    {participation.challenge_title}
                                </Link>
                            </h3>
                            <p>{participation.challenge.title}</p>
                            <p>Joined: {participation.join_date}</p>
                            <p>Progress Entries: {participation.progress?.length || 0}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard