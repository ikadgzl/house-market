import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';
import { withOAuth } from '../lib/auth';

function OAuth({ method }) {
  const navigate = useNavigate();

  const handleOAuth = async () => {
    const user = await withOAuth();

    if (user) {
      toast.success('Signed In!');

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast.error('Google Login could not work!');
    }
  };

  return (
    <div className='socialLogin'>
      <p> {method} with</p>
      <button className='socialIconDiv' onClick={handleOAuth}>
        <img className='socialIconImg' src={googleIcon} alt='google icon' />
      </button>
    </div>
  );
}

export default OAuth;
