import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/database"

// to use firebase you have to have an ".env.local" file with the api keys
// ask paul if you doesn't work for you

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL : process.env.REACT_APP_FIREBASE_DATABASE_URL
};

const app = firebase.initializeApp(firebaseConfig);


//Auth Context will use this auth object. Normaly you don't need to access this directly.
export const auth = app.auth() 

// DOCS: https://firebase.google.com/docs/database/web/read-and-write
// You can use the database by using "import {database} from 'path/to/firebase'"
export const database = app.database()

export default app