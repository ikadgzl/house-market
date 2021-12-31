import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function PrivateRoute() {
  const currentUser = getAuth().currentUser;

  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
