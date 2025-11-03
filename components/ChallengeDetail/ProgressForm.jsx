import {useState} from 'react'
import axios from 'axios'

function ProgressForm({participation, setChallenge}) {
    const [progressData, setProgressData] = useState({
        date: new Date().toISOString().split('T')[0],
        status: 'D'
    })

    const [message, setMessage] = useState('')

    function handleChange(event) {
        setProgressData({
            ...progressData,
            [event.target.name]: event.target.value
        })
    }

    async function logProgress(event) {
        event.preventDefault()

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/participations/${participation.id}/progress/`, progressData)
            setMessage(`Progress logged for ${progressData.date}!`)

            const UpdateResponse = await axios.get(`http://127.0.0.1:8000/api/challenges/${participation.challenge}/`)
            setChallenge(UpdateResponse.data)

        } catch (error) {
            setMessage('Error logging progress')
        }
        
    }
  return (
    <div>
        <form onSubmit={logProgress}>
            <input type='date' value={progressData.date} onChange={handleChange} />
            <select name="status" value={progressData.status} onChange={handleChange} >
                <option value="D">Done</option>
                <option value="P">Partial</option>
                <option value="S">Skipped</option>
            </select>
            <button type='submit'>Log Progress</button>
        </form>
        {message && <p>{message}</p> }
    </div>
  )
}

export default ProgressForm