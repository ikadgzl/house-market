import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

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

function App() {
  const auth = getAuth();

  if (!auth) {
    <Spinner />;
  }

  return (
    <>
      {auth && (
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route index element={<Explore />} />
              <Route path='/offer' element={<Offers />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
          <Navbar />
        </Router>
      )}

      <ToastContainer autoClose={1000} />
    </>
  );
}

export default App;
