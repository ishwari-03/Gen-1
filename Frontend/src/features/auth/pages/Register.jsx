import React, { useState} from 'react'
import '../form.auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const success = await handleRegister({ username, email, password })

        if (success) {
            navigate('/login')
        } else {
            setError("Registration failed. Please try again.")
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    
        <main>
        <div className='form-container'>
            <h1>Register</h1>

            
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="username">Name</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder='Name' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='button primary-button'>Register</button>
            </form>

            <p>Already have an account? <Link to="/login" style={{ color: '#4625a1', textDecoration: 'underline' }}>Login</Link></p>
        </div>
    </main>
    
  )
}

export default Register