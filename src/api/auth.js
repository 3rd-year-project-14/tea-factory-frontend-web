import axios from "./axios";

export const loginWithFirebaseToken = async (token) => {
  const res = await axios.post("/auth/login", { token });
  return res;
};
