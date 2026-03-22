import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user, handleLogout, loading } = useAuth()
    const navigate = useNavigate()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        navigate('/login')
        return null
    }

    return (
        <main>
            <h1>Welcome, {user?.username || user?.email}!</h1>
            <p>You are logged in.</p>
            <button onClick={handleLogout}>Logout</button>
        </main>
    )
}

export default Home