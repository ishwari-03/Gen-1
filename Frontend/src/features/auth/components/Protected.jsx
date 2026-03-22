import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [loading, user, navigate])

  if(loading) {
    return <main>
        <div>Loading...</div>
    </main>
  }

  if (!user) {
    return <main>
        <div>Redirecting to login...</div>
    </main>
  }

  return children
}

export default Protected