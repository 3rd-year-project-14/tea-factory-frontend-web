// API functions for payment manager

export const getPaymentDashboard = async () => {
  // ...implement get payment dashboard API call...
};

// API for fetching tea rate records
export const fetchTeaRateRecords = async (userId) => {
  const API_URL = "http://localhost:8080/api/tea_rates";
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch tea rate records");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tea rate records:", error);
    return [];
  }
};

// API for submitting tea rate adjustment
export const submitTeaRateAdjustment = async (payload) => {
  const API_URL = "http://localhost:8080/api/tea_rates";
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });
    if (response.status === 200 || response.status === 201) {
      return await response.json();
    } else {
      throw new Error("Failed to submit tea rate adjustment");
    }
  } catch (err) {
    console.error("Error submitting tea rate adjustment:", err);
    throw err;
  }
};
