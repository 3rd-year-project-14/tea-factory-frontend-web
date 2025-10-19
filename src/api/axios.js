import axios from "axios";
import { getAuth } from "firebase/auth";
import firebaseApp from "../firebase";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use(
  async (config) => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
