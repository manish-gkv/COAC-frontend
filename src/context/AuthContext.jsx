import { createContext, useContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

import { API_BASE_URL } from "@/utils";

import useProfile from "../hooks/useProfile";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { hasProfile, fetchProfile, setProfile, setHasProfile} = useProfile();
    const navigate = useNavigate();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
    }, []);
    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);
    useEffect(() => {
        if (user && hasProfile !== null) {
            if(!hasProfile) {
                navigate("/create-profile");
            }
            else {
                navigate("/");
            }
        }
    }, [hasProfile, user]);
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
                await fetchProfile();
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
                await fetchProfile();
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
        setProfile(null);
        setHasProfile(false);
        localStorage.removeItem("user");
        navigate("/auth");
    }

    const isAuthenticated = !!user ; // Check if user is authenticated

    return(
        <AuthContext.Provider value={{ user, login, loading, signup, logout, isAuthenticated}}> {children }</AuthContext.Provider>
    )

}

