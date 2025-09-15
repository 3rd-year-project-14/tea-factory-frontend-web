
import axios from "./axios";

const TEA_RATE_API_URL = "/tea_rates";

// Get tea rate records for a user
export const fetchTeaRateRecords = async (userId) => {
  try {
    const response = await axios.get(`${TEA_RATE_API_URL}?userId=${userId}`);
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching tea rate records:", error);
    return [];
  }
};

// Submit tea rate adjustment
export const submitTeaRate = async (payload) => {
  try {
    const res = await axios.post(TEA_RATE_API_URL, payload);
    return res;
  } catch (err) {
    console.error("Error submitting tea rate:", err);
    throw err;
  }
};
