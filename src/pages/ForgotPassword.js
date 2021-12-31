import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import { forgotPassword } from '../lib/auth';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const success = await forgotPassword(email);

    if (success) {
      toast.success('Send Email!');

      setTimeout(() => {
        navigate('/sign-in');
      }, 1000);
    } else {
      toast.error('Could not send email!');
    }
  };

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={handleForgotPassword}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleInputChange}
          />

          <Link className='forgotPasswordLink' to='/sign-in'>
            Back to Sign In
          </Link>

          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button type='submit' className='signInButton'>
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
