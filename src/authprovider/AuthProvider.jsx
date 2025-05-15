import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from './../hooks/useAxiosPublic';
import axios from 'axios';


export const AuthContex=createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const[loading,setLoading]=useState(true)

    const googleProvider=new GoogleAuthProvider()

    const axiosPublic=useAxiosPublic()

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

    

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,async(currentUser)=>{
            setUser(currentUser);

            // console.log('currentUser-> ',currentUser);

            if(currentUser?.email){
                const email={email:currentUser?.email}
                // console.log('email->',email);
                try {
                    const {data}=await axiosPublic.post('/jwt',email,{withCredentials:true})
                    // const data= await axios.post('http://localhost:5000/jwt',email,{withCredentials:true})
                    
                } catch (error) {
                    // console.log(error);
                }
            }else{
                await axiosPublic('/logout',{withCredentials:true})
            }

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