import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

function PrivateRoute() {
  const currentUser = auth.currentUser;

  console.log(auth.currentUser);

  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
