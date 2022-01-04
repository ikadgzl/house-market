import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

import { fetchListing } from '../lib/firestore';
import { auth } from '../firebase/config';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchListingAsync = async () => {
      const data = await fetchListing(id);

      setListing(data);
      setLoading(false);
    };

    fetchListingAsync();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    setShareLinkCopied(true);

    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  if (loading) return <Spinner />;

  return (
    <main>
      {/* slider */}

      <div className='shareIconDiv' onClick={handleCopyLink}>
        <img src={shareIcon} alt='share icon' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>

        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            $
            {(listing.regularPrice - listing.discountedPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} bedrooms`
              : '1 bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : '1 bathroom'}
          </li>
          <li> {listing.parking && 'Parking Spot'}</li>
          <li> {listing.furnished && 'Furnished'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>

        {/* map */}

        {auth.currentUser.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
