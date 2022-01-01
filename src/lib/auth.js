import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { addDocument } from './firestore';

export const signUp = async ({ name: displayName, email, password }) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredentials.user;

    updateProfile(user, {
      displayName
    });

    addDocument({ displayName, email }, 'users', user.uid);

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredentials.user;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const withOAuth = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const docSnap = await getDoc(doc(db, 'users', user.uid));
    if (!docSnap.exists()) {
      await addDocument(
        { displayName: user.displayName, email: user.email },
        'users',
        user.uid
      );
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};
