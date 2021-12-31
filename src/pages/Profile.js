import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

import { toast } from 'react-toastify';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const [changeDetails, setChangeDetails] = useState(false);

  const handleLogOut = async () => {
    await auth.signOut();
    toast.success('Signed Out.');

    setTimeout(() => {
      navigate('/sign-in');
    }, 1000);
  };

  const handleProfileDetailsChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  const updateUser = async () => {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        const userRef = doc(db, 'users', auth.currentUser.uid);

        await updateProfile(auth.currentUser, { displayName: formData.name });
        await updateDoc(userRef, { displayName: formData.name });

        toast.success('Profile updated successfully! ');
      }
    } catch (error) {
      toast.error('Could not update');
    }
  };

  const handleChangeClick = () => {
    changeDetails && updateUser();

    setChangeDetails((prevChangeDetails) => !prevChangeDetails);
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        {formData.name} {formData.email}
        <button type='button' className='logOut' onClick={handleLogOut}>
          Log Out
        </button>
      </header>

      <main>
        <div className='profileDetailsMain'>
          <p className='profileDetailsText'>PersonalDetails</p>
          <p className='changePersonalDetails' onClick={handleChangeClick}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              name='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={formData.name}
              onChange={handleProfileDetailsChange}
            />

            <input
              type='email'
              name='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={formData.email}
              onChange={handleProfileDetailsChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
