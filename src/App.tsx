import { useEffect, useState, useContext } from 'react'
import './index.css'
import { Switch, Route, Redirect } from 'wouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@mantine/core/styles.css'
import { useAuth, AppContext } from './auth/AppContext'
import Layout from './components/Layout/Layout'
import Landing from './components/Dashboard/Landing'
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

  let jobs = []
  if (globalContext?.isLoggedIn && globalContext.user?.jobs) {
    // sort by activity
    jobs = globalContext?.user?.jobs?.sort((a, b) => {
      if (a.lastUpdatedDate && b.lastUpdatedDate) {
        return b.lastUpdatedDate - a.lastUpdatedDate
      } else if (a.createdDate && b.createdDate) {
        return b.createdDate - a.createdDate
      } else if (a.applicationDate && b.applicationDate) {
        return b.applicationDate - a.applicationDate
      }
    })
  } else {
    // public jobs, sort by activity
    jobs = globalContext?.publicJobs?.sort((a, b) => {
      if (a.lastUpdatedDate && b.lastUpdatedDate) {
        return b.lastUpdatedDate - a.lastUpdatedDate
      } else if (a.createdDate && b.createdDate) {
        return b.createdDate - a.createdDate
      } else if (a.applicationDate && b.applicationDate) {
        return b.applicationDate - a.applicationDate
      }
    })
  }

  useEffect(() => {
    if (isLoggedIn && !user.email && !user.id) {
      logout()
    }      
  }, [])

  // const jobsCollections = collection(db, 'jobs')
  // const [jobs, setJobs] = useState([])

  // useEffect(() => {
  //   const getJobs = async () => {
  //    const data = await getAllJobs(jobsCollections)
  //    setJobs(data.docs.map((d) => ({
  //     ...d.data(), id: d.id
  //    })))
  //   }
  //   getJobs()
  // }, [])

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
                  <Landing jobs={jobs} />
                )}
              />
              {/* <ProtectedRoute path='/test' component={Test} /> */}
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
                    <Landing jobs={jobs} />
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
