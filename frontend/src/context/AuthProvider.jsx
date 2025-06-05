import { createContext } from "react";
import cookies from "js-cookie";
import { useState,useContext } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(()=>{
        return localStorage.getItem('token') || cookies.get("jwt") || null;
    })
    return(
    <authContext.Provider value={[authUser, setAuthUser]}>
        {children}
    </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);