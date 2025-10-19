import api from "./axios";

// API functions for transport manager
export const getTransportDashboard = async () => {
  // ...implement get transport dashboard API call...
};

export const createVehicle = async (data) => {
  try {
    const res = await api.post("/vehicles", data);
    return res;
  } catch (err) {
    console.error("Error creating vehicle:", err);
    throw err;
  }
};
