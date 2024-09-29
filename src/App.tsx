import { useEffect, useContext } from 'react'
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

  const sortJobsByActivity = (jobs: Array<JobEntry>) => {
    return jobs.sort((a: JobEntry, b: JobEntry) => {
      // Compare last updated dates first
      if (a.lastUpdatedDate && b.lastUpdatedDate) {
        return b.lastUpdatedDate - a.lastUpdatedDate // Sort by last updated date
      } else if (a.lastUpdatedDate) {
        return -1 // `a` has a last updated date, `b` does not, so `a` comes first
      } else if (b.lastUpdatedDate) {
        return 1 // `b` has a last updated date, `a` does not, so `b` comes first
      }
  
      // If last updated dates are the same or both are absent, compare created dates
      if (a.createdDate && b.createdDate) {
        return b.createdDate - a.createdDate // Sort by created date
      } else if (a.createdDate) {
        return -1 // `a` has a created date, `b` does not, so `a` comes first
      } else if (b.createdDate) {
        return 1 // `b` has a created date, `a` does not, so `b` comes first
      }
  
      // If created dates are the same or both are absent, compare application dates
      if (a.applicationDate && b.applicationDate) {
        return b.applicationDate - a.applicationDate // Sort by application date
      } else if (a.applicationDate) {
        return -1 // `a` has an application date, `b` does not, so `a` comes first
      } else if (b.applicationDate) {
        return 1 // `b` has an application date, `a` does not, so `b` comes first
      }
  
      return 0 // If all dates are the same or both are absent, keep the order unchanged
    })
  }
  
  let jobs = []
  if (globalContext?.isLoggedIn && globalContext.user?.jobs) {
    jobs = sortJobsByActivity(globalContext.user.jobs) // Sort user jobs
  } else {
    jobs = sortJobsByActivity(globalContext?.publicJobs) // Sort public jobs
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
            position='bottom-right'
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
