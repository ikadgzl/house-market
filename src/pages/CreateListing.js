import { useState } from 'react';
import { toast } from 'react-toastify';
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
  lng: 0
};

function CreateListing() {
  const [formData, setFormData] = useState({
    ...INITIAL_DATA,
    userRef: auth.currentUser.uid
  });
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    } else if (e.target.value === 'false') {
      boolean = false;
    }

    if (!e.target.files) {
      setFormData((prevForm) => ({
        ...prevForm,
        [e.target.name]: boolean ?? e.target.value
      }));
    } else {
      setFormData((prevForm) => ({
        ...prevForm,
        imageUrls: e.target.files
      }));
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(formData);
    if (formData.discountedPrice >= formData.regularPrice) {
      setLoading(false);

      toast.error('Discounted price needs to be less than regular price!');
      return;
    }

    if (formData.imageUrls.length > 6) {
      setLoading(false);

      toast.error('Max 6 images!');
      return;
    }

    let geolocation = {};

    if (geolocationEnabled) {
      // NEED TO PAY FOR THIS API...
      // const res = await fetch(
      //   `https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=AIzaSyBejH-VP6WaOi-1z17td48gqo5gHtuTQTk`
      // );
      // const data = await res.json();
    } else {
      geolocation.lat = formData.lat;
      geolocation.lng = formData.lng;
    }

    setLoading(false);
  };

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>

      <main>
        <form onSubmit={handleCreateListing}>
          <label className='formLabel'>Sell / Rent </label>
          <div className='formButtons'>
            <button
              type='button'
              name='type'
              className={
                formData.type === 'sale' ? 'formButtonActive' : 'formButton'
              }
              value='sale'
              onClick={handleMutate}
            >
              Sell
            </button>

            <button
              type='button'
              name='type'
              className={
                formData.type === 'rent' ? 'formButtonActive' : 'formButton'
              }
              value='rent'
              onClick={handleMutate}
            >
              Rent
            </button>
          </div>

          <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                name='bedrooms'
                value={formData.bedrooms}
                onChange={handleMutate}
                min='1'
                max='50'
                required
              />
            </div>

            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          <label className='formLabel'>Parking Spot </label>
          <div className='formButtons'>
            <button
              type='button'
              name='parking'
              className={formData.parking ? 'formButtonActive' : 'formButton'}
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              type='button'
              name='parking'
              className={!formData.parking ? 'formButtonActive' : 'formButton'}
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Furnished </label>
          <div className='formButtons'>
            <button
              type='button'
              name='furnished'
              className={formData.furnished ? 'formButtonActive' : 'formButton'}
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              type='button'
              name='furnished'
              className={
                !formData.furnished ? 'formButtonActive' : 'formButton'
              }
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            name='address'
            value={formData.address}
            onChange={handleMutate}
            required
          />

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  name='lat'
                  value={formData.lat}
                  onChange={handleMutate}
                  required
                />
              </div>

              <div>
                <label className='formLabel'>Longtitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  name='lng'
                  value={formData.lng}
                  onChange={handleMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className='formLabel'>Offer </label>
          <div className='formButtons'>
            <button
              type='button'
              name='offer'
              className={formData.offer ? 'formButtonActive' : 'formButton'}
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              type='button'
              name='offer'
              className={!formData.offer ? 'formButtonActive' : 'formButton'}
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              name='regularPrice'
              value={formData.regularPrice}
              onChange={handleMutate}
              min='50'
              max='750000000'
              required
            />

            {formData.type === 'rent' && (
              <p className='formPriceText'>$ / Month</p>
            )}
          </div>

          {formData.offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                name='discountedPrice'
                value={formData.discountedPrice}
                onChange={handleMutate}
                min='50'
                max='750000000'
                required={formData.offer}
              />
            </>
          )}

          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6)
          </p>
          <input
            className='formInputFile'
            type='file'
            name='imageUrls'
            onChange={handleMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />

          <button className='primaryButton createListingButton' type='submit'>
            Create
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
