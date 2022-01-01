import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  let isMounted = useRef(false).current;

  useEffect(() => {
    isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        isMounted && setUser(user);
      }

      isMounted && setIsAuthReady(true);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [auth]);

  return { user, isAuthReady, auth };
};
