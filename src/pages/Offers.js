import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';

import Spinner from '../components/Spinner';
import { fetchListings } from '../lib/firestore';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingsAsync = async () => {
      const listings = await fetchListings(['offer', '==', true]);

      if (listings.length > 0) {
        setListings(listings);
      }

      setLoading(false);
    };

    fetchListingsAsync();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!listings) {
    return <p>No listings for offers</p>;
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Places for offers</p>
      </header>

      <main>
        <ul className='categoryListings'>
          {listings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Offers;
