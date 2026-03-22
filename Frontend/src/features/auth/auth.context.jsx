import { createContext, useState, useEffect } from "react";
import { getme } from "./services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getme()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (error) {
                console.error("Auth check failed:", error)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}