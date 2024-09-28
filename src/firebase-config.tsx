// @ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getFirestore, setDoc, doc, getDoc, Timestamp } from '@firebase/firestore'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification} from 'firebase/auth'
import { fireToast } from './components/Toasts/fireToast'
import { navigate } from 'wouter/use-browser-location'

// import { successToast, failToast } from './Components/Toasts/toasts'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyDOY7t8PmtPhtBgcJUD3Nv7sQdwFHPZfFw',
//   authDomain: 'http://movieconquest-87.firebaseapp.com ',
//   projectId: 'movieconquest-87',
//   storageBucket: 'movieconquest-87.appspot.com',
//   messagingSenderId: '450698528852',
//   appId: '1:450698528852:web:ebbfb0b5126250899a45c1',
//   measurementId: 'G-S98GS14M0E'
// }

const firebaseConfig = {
  apiKey: "AIzaSyDg992I1OALgTJ7nsX844CiRv_Is2ngKt0",
  authDomain: "jtracker-823e4.firebaseapp.com",
  projectId: "jtracker-823e4",
  storageBucket: "jtracker-823e4.appspot.com",
  messagingSenderId: "312257479396",
  appId: "1:312257479396:web:ee14b3c51a53ed5cdb62f1",
  measurementId: "G-8E2ZFRMC8R"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)


export const createAccountWithEmail = async (email, password, username = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    navigate('/signup-confirmation')
    fireToast({content: 'Account Created!'})
    
    const uid = userCredential.user.uid
    
    await setDoc(doc(db, 'Users', uid), {
      darkMode: true,
      email: email,
      favTierLists: [],
      language: 'English',
      notifications: true,
      profilePic: '',
      subscribed: false,
      subscriptionEnd: '',
      subscriptionStart: '',
      accountCreatedAt: Timestamp.now(),
      username: '',
      // Add additional user information here if needed
      //userid: uid, //-> id is auto generated...
    })

    await sendEmailVerification(userCredential.user)
  } catch (error) {
    fireToast({type: 'error', content: error})
    console.error('Error creating account: ', error)
  }
}


export const loginEmailPassword = async (email: string, p: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, p)
    
    const userId = userCredential.user.uid
    const userDoc = await getDoc(doc(db, 'Users', userId))
    const userData = userDoc.data()
    if (userData) {
      const newUserData = structuredClone(userData)
      
      if (!newUserData.id) {
        newUserData.id = userId
      }
      return newUserData
    } else {
      return 'No Data'
    }
    
  } catch(e) {
    // Handle login errors
    return e
  }
}

export const addUserToUserCollection = async (uid, email) => {
  try {
    await db.collection('Users').doc(uid).set({
      email: email,
      // You can add additional user information here
    })
  } catch (error) {
    console.error('Error adding user to Firestore: ', error)
  }
}


export const monitorAuthState = async () => {
  // can hide UI based on this
  onAuthStateChanged(auth, user => {
    console.log('Auth Changed')
    if (user) {
      // show app
    } else {
      // show login form
    }
  })
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (e) {
    failToast('Failed to Log Out! Contact your Site Administator')
  }
}

export default app