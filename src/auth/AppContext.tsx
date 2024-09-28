import React, {createContext, useState, useContext, useEffect} from 'react'
import {onAuthStateChanged, getAuth} from '@firebase/auth'
import {loginEmailPassword, logout } from '../firebase-config.tsx'
import {getUserData} from '../utils/api'
import {createBrowserHistory} from 'history'
import { fireToast } from '../components/Toasts/fireToast'
import { useLocation } from 'wouter'
import { getRecaptcha } from '../utils/api'

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AuthProvider: React.FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserObject>({
    email: '',
    id: ''
  })
  const [location, setLocation] = useLocation()
  const [rKey, setRKey] = useState('')
  const history = createBrowserHistory()
  const auth = getAuth()
  const emailVerified = auth.currentUser?.emailVerified || false
  const siteName = 'jTracker'
  
  useEffect(() => {
    const getRecap = async () => {
      const d = await getRecaptcha()
      if (d.docs.length) {
        setRKey(d.docs[0].data().sitekey)
      }
    }
    getRecap()}, [])

  const getUserDataObj = (id: string) => {
    getUserData(id)
    .then((dbUser: any) => {
      if (dbUser) {
        setUser(dbUser)
      }
    })
    .catch((e) => fireToast({type: 'error', content: e}))
  }


  useEffect(() => {
    // Check the user's authentication status when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in
        if (u.uid) {
          getUserDataObj(u.uid)
          setIsLoggedIn(true)
          u.emailVerified ? setLocation('/landing') : setLocation('/signup-confirmation')
        }
      } else {
        setIsLoggedIn(false)
        setUser({
          email: '',
          id: ''
        })
      }
    })
    return unsubscribe
  }, [])

  const login = async (email: string, pw: string) => {
    const res = await loginEmailPassword(email, pw)
    if (res?.name?.toLowerCase()?.includes('error') && res.code) {
      setIsLoggedIn(false)
      if (res.code?.includes('email')) {
        fireToast({type: 'error', content: 'Invalid email'})  
      } else if (res.code?.includes('credential')) {
        fireToast({type: 'error', content: 'Invalid password'})
      } else {
        fireToast({type: 'error', content: 'Something went wrong logging in. Please check your credentials.'})
      }
    } else if (res.id || res.userid) {
      // is signed in
      setIsLoggedIn(true)
      setUser(res)
      fireToast({content: 'Welcome Back, ' + (res.username || res.email)})
    } else {
      fireToast({type: 'error', content: 'Something went wrong logging in. Please check your credentials.'})
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
      setIsLoggedIn(false)
      setUser({
        email: '',
        id: ''
      })
    } catch (error) {
      console.error('Error signing out:', error)
      fireToast({type: 'error', content: error + ''})
    }
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout, user, getUserDataObj, history, emailVerified, siteName, rKey}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAuth = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
