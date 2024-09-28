// ProtectedRoute.tsx
import { RouteProps, Route, Redirect, useLocation } from 'wouter'
import { useAuth } from './AppContext'

interface ProtectedRouteProps extends RouteProps {
  component: React.FC<any>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isLoggedIn, emailVerified } = useAuth()

  return (
    <Route
      {...rest}
      component={(props: any) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
}

export default ProtectedRoute
