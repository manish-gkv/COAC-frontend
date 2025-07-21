import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

import { API_BASE_URL } from "@/utils";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
    }, []);

    async function login(userData) {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL+"/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if(response.ok) {
                const json = await response.json();
                setUser(json.data);
                localStorage.setItem("user", JSON.stringify(json.data));
                navigate("/");
            }
        }
        catch (error) {
            console.error("Login failed:", error);
        }
        finally {
            setLoading(false);
        }    
        
    }

    async function signup(userData) {
        setLoading(true);
        try {
            const response = await fetch(API_BASE_URL+"/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if(response.ok) {
                const json = await response.json();
                setUser(json.data);
                localStorage.setItem("user", JSON.stringify(json.data));
                navigate("/");
            }
        }
        catch (error) {
            console.error("Signup failed:", error);
        }
        finally {
            setLoading(false);
        }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("user");
        <NavLink to="/auth"></NavLink>
    }

    const isAuthenticated = !!user ; // Check if user is authenticated

    return(
        <AuthContext.Provider value={{ user, login, loading, signup, logout, isAuthenticated}}> {children }</AuthContext.Provider>
    )

}

