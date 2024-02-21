import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'

// This is an example component to show how to use the auth context provider
export default function AuthUseCaseExample() {

    // every values that is exported in vthe auth context can be exported here
    // const { currentUser, signIn, signOut, ...} = useAuth()
    const { currentUser, signIn, signOut, createNewUser } = useAuth()

    // this states disables the buttons while the client signs in
    const [loading, setLoading] = useState(false)

    // create a new user is mostly a out of the box function
    const handleCreateNewUser = () => {
        createNewUser("tom@gmail.com", "123456", "Tom").then(() => console.log("create new user"))
    }

    // this function utilizes the provided signIn function from AuthContext
    const handleSignIn = () => {
        setLoading(true) // set loading to true while logging in

        signIn("tom@gmail.com", "123456").then(() => {
            console.log("signed in!")
            setLoading(false)  // reset loading
        }).catch((err) => {
            console.log(err)
        })
    }

    // this function utilizes the provided signOut function from AuthContext
    const handleSignOut = () => {
        signOut().then(() => {
            console.log("signed out!")
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <span> {currentUser ? "signed in as: " + currentUser.email : "you are not signed in"} </span>
            <hr/>
            <button disabled={loading} onClick={handleSignIn}>
                Sign in with "example@mail.com and password HarryPotter" 
            </button>
            <button onClick={handleSignOut}>
                Sign out
            </button>
            <div>
                <button onClick={handleCreateNewUser}>
                    Create New User [Tom, tom@gmail.com, 1234]
                </button>
            </div>
        </div>
    )
}
