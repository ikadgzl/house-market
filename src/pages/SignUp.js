import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../lib/auth';

import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';

const INITIAL_FORM_DATA = { name: '', email: '', password: '' };

function SignUp() {
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

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = await signUp(formData);

    if (user) {
      toast.success('Signed Up!');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error('Bad user credentials!');
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Hey, wanna sign up?</p>
      </header>

      <form onSubmit={handleSignUp}>
        <input
          type='text'
          className='nameInput'
          placeholder='Name'
          name='name'
          value={formData.name}
          onChange={handleFormInput}
        />

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

        <div className='signUpBar'>
          <p className='signUpText'>Sign Up</p>

          <button type='submit' className='signUpButton'>
            <ArrowRightIcon fill='#fff' width='34px' heigh='34px' />
          </button>
        </div>
      </form>

      <OAuth method='Sign Up' />

      <Link to='/sign-in' className='registerLink'>
        Already have an account? Sign In.
      </Link>
    </div>
  );
}

export default SignUp;
