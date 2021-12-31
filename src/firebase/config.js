import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBejH-VP6WaOi-1z17td48gqo5gHtuTQTk',
  authDomain: 'house-market-c61c5.firebaseapp.com',
  projectId: 'house-market-c61c5',
  storageBucket: 'house-market-c61c5.appspot.com',
  messagingSenderId: '424648687829',
  appId: '1:424648687829:web:d87a14d28139ec47e6a25c'
};

initializeApp(firebaseConfig);

export const db = getFirestore();
