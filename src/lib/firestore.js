import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const addDocument = async (data, collectionName, documentId) => {
  try {
    const document = { ...data, timestamp: serverTimestamp() };

    await setDoc(doc(db, collectionName, documentId), document);
  } catch (error) {
    console.log(error);
  }
};

export const fetchListings = async (_query) => {
  try {
    const listingsRef = collection(db, 'listings');

    let q;
    if (_query) {
      q = query(
        listingsRef,
        where(..._query),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
    } else {
      q = query(listingsRef, orderBy('timestamp', 'desc'), limit(10));
    }

    const querySnapshot = await getDocs(q);

    const listings = querySnapshot.docs.map((item) => ({
      ...item.data(),
      id: item.id
    }));

    return listings;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDoc = async (from, id) => {
  try {
    const docRef = doc(db, from, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
