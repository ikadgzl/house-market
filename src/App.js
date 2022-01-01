import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Spinner';
import { auth } from './firebase/config';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(true);

      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route index element={<Explore />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/category/:categoryName' element={<Category />} />
          </Route>
          <Route
            path='/sign-in'
            element={!user ? <SignIn /> : <Navigate to='/' />}
          />
          <Route
            path='/sign-up'
            element={!user ? <SignUp /> : <Navigate to='/' />}
          />
          <Route
            path='/forgot-password'
            element={!user ? <ForgotPassword /> : <Navigate to='/' />}
          />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
