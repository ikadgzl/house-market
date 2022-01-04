import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDoc } from '../lib/firestore';

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { landlordId } = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const fetchedLandLord = await fetchDoc('users', landlordId);

      if (fetchedLandLord) {
        setLandlord(fetchedLandLord);
      } else {
        toast.error('Could not get landlord data');
      }
    };

    getLandlord();
  }, [landlordId]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className='papgeContainer'>
      <p className='pageHeader'>Contact Landlord</p>

      {landlord && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact {landlord.displayName}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={handleMessage}
              />
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&bod=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
