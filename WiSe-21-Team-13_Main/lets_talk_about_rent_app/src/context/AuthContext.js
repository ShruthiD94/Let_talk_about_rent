import React, {useContext, useState, useEffect} from 'react'
import { auth, database } from '../firebase'

// This is the Auth Context (Provider).
// You can use this as a wrapper element to share values
// e.g. : <AuthProvider> <element/> </AuthProvider>

// HOOK DOC: https://reactjs.org/docs/hooks-reference.html#usecontext

const AuthContext = React.createContext()

// useContext Wrapper for our authentication context
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])

    function signIn(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signUp(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signOut(){
        return auth.signOut()
    }

    async function createNewUser(email, password, displayName, city){
        const userAuth = await signUp(email, password)

        await userAuth.user.updateProfile({displayName: displayName})
        await userAuth.user.updateProfile({city: city})

        const user = {
            displayName : displayName,
            city : city,
            uid : userAuth.user.uid,
            posts : []
            // add profile image here too
        }


        setCurrentUser(userAuth.user)

        return database.ref("users/" + user.uid).set(user)
    }

    // every value that other components should have access to 
    const values = {
        currentUser,
        signIn,
        signOut,
        createNewUser
    }

    return (
        <div>
            <AuthContext.Provider value={values}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}
