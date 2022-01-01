import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

function PrivateRoute() {
  return auth.currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
