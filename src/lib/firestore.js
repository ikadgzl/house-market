import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const addDocument = async (data, collectionName, documentId) => {
  try {
    const document = { ...data, timestamp: serverTimestamp() };

    await setDoc(doc(db, collectionName, documentId), document);
  } catch (error) {
    console.log(error);
  }
};
