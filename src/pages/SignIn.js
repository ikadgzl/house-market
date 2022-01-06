import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../lib/auth';

import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

const INITIAL_FORM_DATA = { email: '', password: '' };

function SignIn() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleFormInput = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const user = await signIn(formData);

    if (!user) {
      toast.error('Bad user credentials!');
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcome back, wanna sign in?</p>
      </header>

      <form onSubmit={handleSignIn}>
        <input
          type='email'
          className='emailInput'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleFormInput}
        />

        <div className='passwordInputDiv'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='passwordInput'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleFormInput}
          />

          <img
            src={visibilityIcon}
            alt='show password'
            className='showPassword'
            onClick={handleShowPassword}
          />
        </div>

        <Link to='/forgot-password' className='forgotPasswordLink'>
          Forgot password?
        </Link>

        <div className='signInBar'>
          <p className='signInText'>Sign In</p>

          <button type='submit' className='signInButton'>
            <ArrowRightIcon fill='#fff' width='34px' heigh='34px' />
          </button>
        </div>
      </form>

      <OAuth method='Sign In' />

      <Link to='/sign-up' className='registerLink'>
        Don't have an account?
      </Link>
    </div>
  );
}

export default SignIn;
