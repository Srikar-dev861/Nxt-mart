import Cookies from 'js-cookie'
import {Navigate, useLocation} from 'react-router-dom'

function ProtectedRoute({children}) {
  const jwtToken = Cookies.get('jwt_token')
  const location = useLocation()

  if (!jwtToken) {
    return <Navigate to="/login" replace state={{from: location}} />
  }

  return children
}

export default ProtectedRoute
