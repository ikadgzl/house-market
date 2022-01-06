import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { fetchListings } from '../lib/firestore';
import Spinner from './Spinner';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getListingsAsync = async () => {
      const fetchedListings = await fetchListings(null);

      setListings(fetchedListings);
      setLoading(false);
    };

    getListingsAsync();
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <p className='exploreHeading'>Recommended</p>

      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listings.map((list) => (
          <SwiperSlide
            key={list.id}
            onClick={() => navigate(`/category/${list.type}/${list.id}`)}
          >
            <div
              style={{
                background: `url(${list.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover'
              }}
              className='swiperSlideDiv'
            >
              <p className='swiperSlideText'>{list.name}</p>
              <p className='swiperSlidePrice'>
                $
                {(list.discountedPrice ?? list.regularPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {list.type === 'rent' && ' / month'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
