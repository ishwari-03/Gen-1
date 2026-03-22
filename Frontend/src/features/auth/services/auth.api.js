import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
    timeout: 10000 // 10 second timeout
})

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/register",
            { username, email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function login({ email, password }) {
    const response = await api.post('/login', {
        email, password
    })
    return response.data
}

export async function logout() {
    const response = await api.get('/logout')
    return response.data
}

export async function getme() {
    const response = await axios.get(
        "http://localhost:3000/api/auth/getme",
        { withCredentials: true }
    );
    return response.data;
}