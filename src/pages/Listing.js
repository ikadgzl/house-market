import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { fetchDoc } from '../lib/firestore';
import { auth } from '../firebase/config';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchListingAsync = async () => {
      const data = await fetchDoc('listings', id);

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
      <Swiper slidesPerView={1} paginationn={{ clickable: true }}>
        {listing.imageUrls.map((url, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover'
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

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

        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.lat, listing.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />
            <Marker position={[listing.lat, listing.lng]}>
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

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
