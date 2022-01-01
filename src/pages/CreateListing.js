import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { auth } from '../firebase/config';

const INITIAL_DATA = {
  type: '',
  name: '',
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  address: '',
  offer: false,
  regularPrice: 0,
  discountedPrice: 0,
  imageUrls: [],
  lat: 0,
  long: 0
};

function CreateListing() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  let isMounted = useRef(false).current;

  useEffect(() => {
    isMounted = true;

    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign=in');
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }
  return <div>create</div>;
}

export default CreateListing;
