import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// run once when the app starts: reuse a saved login after a page refresh
const savedToken = localStorage.getItem("token");
if (savedToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const login = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common.Authorization;
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);