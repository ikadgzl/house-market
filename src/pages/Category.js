import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

import Spinner from '../components/Spinner';
import { fetchListings } from '../lib/firestore';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchListingsAsync = async () => {
      const listings = await fetchListings(['type', '==', categoryName]);

      if (listings.length > 0) {
        setListings(listings);
      }

      setLoading(false);
    };

    fetchListingsAsync();
  }, [categoryName]);

  if (loading) {
    return <Spinner />;
  }

  if (!listings) {
    return <p>No listings for {categoryName}</p>;
  }

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Places for {categoryName}</p>
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

export default Category;
