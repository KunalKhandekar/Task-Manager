import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, signup as signupApi, logout as logoutApi, getMe } from '../api/auth.api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMe()
            .then((res) => setUser(res.data.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (credentials) => {
        const res = await loginApi(credentials);
        setUser(res.data.data.user);
        return res.data.data.user;
    };

    const signup = async (credentials) => {
        const res = await signupApi(credentials);
        setUser(res.data.data.user);
        return res.data.data.user;
    };

    const logout = async () => {
        await logoutApi();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
