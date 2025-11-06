import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { authRequest } from '../../lib/auth'
import './ChallengeForm.scss'

function ChallengeForm({user}) {

    const navigate = useNavigate()
    const {challengeId} = useParams()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        created_by: user.user_id
    })

    async function getSingleChallenge(){
        const response = await authRequest({method: "GET", url: `http://127.0.0.1:8000/api/challenges/${challengeId}/`})
        console.log('Challenge API response:', response.data)  
        setFormData(response.data)
    }

    useEffect(() =>{
        if (challengeId){ 
            getSingleChallenge()
        }
    }, [])

    function handleChange(event){
        setFormData({...formData, [event.target.name]: event.target.value })
        console.log(formData)
    }

    async function handleSubmit(event){
        event.preventDefault()

        let response = {}

        if (challengeId){
            response = await authRequest({method: "PUT", url: `http://127.0.0.1:8000/api/challenges/${challengeId}/`, data: formData})
        } else {
            response = await authRequest({method: "POST", url: 'http://127.0.0.1:8000/api/challenges/', data: formData})
        }

        console.log(response)
        if (response.status === 201 || response.status === 200){
            navigate(`/challenges/${response.data.id}`) 
        }
    }

  return (
    <form onSubmit={handleSubmit} className='challenge-form'>
        <div>
            <h1> {challengeId ? `Edit ${formData.title}` : 'Create New Challenge'} </h1>
            
            <div>
                <label htmlFor="title">Title</label>
                <input value={formData.title} onChange={handleChange} id='title' name='title' required />
            </div>
            
            <div>
                <label htmlFor="description">Description</label>
                <textarea value={formData.description} onChange={handleChange} id='description' name='description' required />
            </div>

            <div>
                <label htmlFor="start_date">Start Date</label>
                <input value={formData.start_date} onChange={handleChange} type='date' id='start_date' name='start_date' required />
            </div>
            
            <div>
                <label htmlFor="end_date">End Date</label>
                <input value={formData.end_date} onChange={handleChange} type='date' id='end_date' name='end_date' required />
            </div>
            
            <button type="submit">
                {challengeId ? 'Update Challenge' : 'Create Challenge'}
            </button>
        </div>
    </form>
  )
}

export default ChallengeForm