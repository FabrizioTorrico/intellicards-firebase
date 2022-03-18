import { storage, auth } from "./storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function uploadImage(file) {
  // Get the file
  const uid = auth.uid;
  const file = Array.from(e.target.files)[0];
  const extension = file.type.split("/")[1];

  const storageRef = ref(storage, `uploads/${uid}/${Date.now()}.${extension}`);

  const metadata = {
    contentType: `image/${extension}`,
  };

  //start uploading
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  let url;
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        url = downloadURL;
      });
    }
  );

  return url;
}
