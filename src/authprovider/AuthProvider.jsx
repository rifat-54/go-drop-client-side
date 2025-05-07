import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContex=createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState()
    const[loading,setLoading]=useState(true)

    const googleProvider=new GoogleAuthProvider()

    const googleLogin=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }


    const updateUser=(name,photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }


    const logoutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }

    console.log("user-> ",user);
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);

            setLoading(false);
        })


        return ()=> unsubscribe()
    },[])


    const authInfo={
        user,
        loading,
        createUser,
        loginUser,
        logoutUser,
        updateUser,
        googleLogin
    }

    return (
        <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>
    );
};

export default AuthProvider;