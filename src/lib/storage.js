import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { auth, storage } from '../firebase/config';

export const storeImage = (images) => {
  const promises = [];

  for (const image of images) {
    promises.push(
      new Promise((resolve, reject) => {
        const storageRef = ref(
          storage,
          `images/${auth.currentUser.uid}/${v4()}/${image.name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      })
    );
  }

  return promises;
};
