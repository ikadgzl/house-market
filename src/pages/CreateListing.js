import { useEffect, useState } from 'react';
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
  const [formData, setFormData] = useState({
    ...INITIAL_DATA,
    userRef: auth.currentUser.uid
  });
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreateListing = (e) => {
    e.preventDefault();
  };

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>

      <main>
        <form onSubmit={handleCreateListing}></form>
      </main>
    </div>
  );
}

export default CreateListing;
