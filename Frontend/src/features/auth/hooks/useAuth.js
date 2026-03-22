import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getme } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // ---------------- LOGIN ----------------
    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const data = await login({ email, password });

            // Axios throws on 4xx/5xx, so if it resolves, the login succeeded.
            // Ensure we handle cases where the user object is returned directly or wrapped.
            if (data !== undefined && data !== null) {
                setUser(data?.user || data);
                return true; // ✅ success
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Login failed:", err);
            return false; // ❌ failure
        } finally {
            setLoading(false);
        }
    };

    // ---------------- REGISTER ----------------
    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);

            const data = await register({ username, email, password });

            if (data !== undefined && data !== null) {
                setUser(data?.user || data);
                return true; // ✅ success
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Register failed:", err);
            return false; // ❌ failure
        } finally {
            setLoading(false);
        }
    };

    // ---------------- LOGOUT ----------------
    const handleLogout = async () => {
        try {
            setLoading(true);

            await logout();

            setUser(null);

        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const getAndSetUser = async () => {
            // Avoid calling API if user data already exists
            if (user !== null && user !== undefined) return;
            
            try {
                setLoading(true);
                const data = await getme()
                setUser(data?.user || data)
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUser(null); // Ensure user is set to null on error
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    };
};