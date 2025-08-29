// firebaseStorage.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app  from "../firebase.js"; // your firebase initialization

const storage = getStorage(app);

export const getNicImageUrl = async (objectName) => {
  if (!objectName) return null;
  try {
    const imageRef = ref(storage, objectName);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching NIC image:", error);
    return null;
  }
};
