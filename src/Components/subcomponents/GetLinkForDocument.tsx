
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";


const uploadFileAndGetDownloadURL = async (file: File, path: string): Promise<string> => {
 
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => { 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress.toFixed(0)}%`);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at:", downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            reject(error);
          });
      }
    );
  });
};

export default uploadFileAndGetDownloadURL;
