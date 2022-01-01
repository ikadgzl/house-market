import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ user }) {
  return user ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
