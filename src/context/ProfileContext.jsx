import { createContext, useState} from "react";

import { API_ENDPOINT } from "@/utils";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    async function fetchProfile() {
        try {
            const response = await fetch(API_ENDPOINT + "profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : ""}`,
                },
            });

            const json = await response.json();
            if(json.success) {
                setProfile(json.data);
                setHasProfile(true);
            }
            else {
                setProfile(null);
                setHasProfile(false);
            }
        } catch (error) {
            setProfile(null);
            setHasProfile(false);
        }
    }


  return (
    <ProfileContext.Provider value={{ profile, fetchProfile, hasProfile, setProfile, setHasProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
