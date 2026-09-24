import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useContext, createContext, useState } from "react";
import { auth } from "../firebase/firebase";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, [])

    const loginWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result.user;
        }catch(error){
            console.log('Google Login error : ', error);
            return null;
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null)
        } catch (error) {
            console.log('Logout error : ', error);
        }
    }

    return (
        <AuthContext.Provider value = {{user, setUser, loginWithGoogle, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}