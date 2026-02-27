"use client";

import { createContext, useState, useContext,useEffect } from "react";
import { getProfile } from "@/services/auth_services";

const UserContext = createContext();

export function UserProvider({ children }) {

  const [userDetailContext, setUserdetailContext] = useState({});

  console.log("user detail in user context: ",userDetailContext)

  useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const user = await getProfile();
      console.log("current user in user context:", user);
      setUserdetailContext(user);
    } catch (error) {
      console.log("Error fetching profile");
    }
  };

  fetchCurrentUser();
}, []);

  return (
    <UserContext.Provider
      value={{
        userDetailContext,
        setUserdetailContext
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
