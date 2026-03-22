import React, { useState } from 'react'
import '../form.auth.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")

        const success = await handleLogin({ email, password });

        if (success) {
            navigate('/', { replace: true });   // ✅ single navigation point
        } else {
            setError("Login failed. Please check your credentials.")
        }
    };

    return (
        <main>
            <div className='form-container'>
                <h1>Login</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            disabled={loading}
                        />
                    </div>

                    <div className='input-group'>
                        <label>Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className='button primary-button' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: '#4625a1', textDecoration: 'underline' }}>
                        Register
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login