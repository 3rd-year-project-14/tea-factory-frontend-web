import axios from "./axios";

// Get pending tea rates
export const getPendingTeaRates = async () => {
  const res = await axios.get("/tea_rates/pending");
  return res.data;
};

// Get approved tea rates
export const getApprovedTeaRates = async (params = {}) => {
  const res = await axios.get("/tea_rates/approved", { params });
  return res.data;
};

// Approve tea rate
export const approveTeaRate = async (rateId) => {
  const res = await axios.post(`/tea_rates/${rateId}/approve`);
  return res.data;
};

// Adjust and approve tea rate
export const adjustTeaRate = async (rateId, adjustedRate, reason = "") => {
  const body = { adjustedRate, adjustmentReason: reason };
  const res = await axios.patch(`/tea_rates/${rateId}/adjust`, body);
  return res.data;
};

// Export tea rate report
export const exportTeaRateReport = async (config) => {
  const res = await axios.post("/tea_rates/export", config, { responseType: "blob" });
  return res.data;
};
