import React, { createContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(app);
        auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <AuthContext.Provider value = {{user}}>
            {children}
        </AuthContext.Provider>
    );
};
