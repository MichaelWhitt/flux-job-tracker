import { useEffect, useState, useContext } from 'react'
import './index.css'
import { Switch, Route, Redirect } from 'wouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css'
import { useAuth, AppContext } from './auth/AppContext'
import Layout from './components/Layout/Layout'
import Landing from './components/Dashboard/Landing'
import Test from './components/Dashboard/Test'
import Account from './components/Account/Account'
import Login from './components/UserAuth/Login'
import SignUp from './components/UserAuth/SignUp'
import SignUpConfirmation from './components/UserAuth/SignUpConfirmation'
import ProtectedRoute from './auth/ProtectedRoute'
import { MantineProvider, createTheme } from '@mantine/core'


function App() {
  const {isLoggedIn, user, logout, emailVerified} = useAuth()
  const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    // primaryColor: 'cyan',
    cursorType: 'pointer'
  })
  const globalContext = useContext(AppContext)
  const userJobEntries = globalContext?.user?.jobs

  useEffect(() => {
    if (isLoggedIn && !user.email && !user.id) {
      logout()
    }      
  }, [])

  return (
    <MantineProvider theme={theme}>
      <div className='bg-bg2'>
        <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        <Layout>
          {isLoggedIn ? (
            <Switch>
              <Route
                path='/landing'
                component={() => (
                  <Landing jobs={userJobEntries || []} />
                )}
              />
              <ProtectedRoute path='/test' component={Test} />
              <ProtectedRoute path='/account' component={Account} />
              <ProtectedRoute path='/signup-confirmation' component={SignUpConfirmation} />
              <ProtectedRoute path='*' component={() => <Redirect to='/landing' />} />
            </Switch>
          ) : (
            <div className='text-white'>
              <Switch>
                <Route
                  path='/landing'
                  component={() => (
                    <Landing jobs={userJobEntries || []} />
                  )}
                />
                <Route path='/login' component={() => <Login />} />
                <Route path='/signup' component={() => <SignUp />} />
                <Route path='/signup-confirmation' component={SignUpConfirmation} />
                <Route path='*' component={() => <Redirect to='/landing' />} />
              </Switch>
            </div>
          )}
        </Layout>
      </div>
    </MantineProvider>
  )
}

export default App
