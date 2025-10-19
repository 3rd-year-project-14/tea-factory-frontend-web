import axios from "./axios";

// Get advances for a factory by status with pagination and filtering
export const getAdvancesByStatus = async (factoryId, status, params = {}) => {
  const res = await axios.get(`/advances/${factoryId}/status`, {
    params: { status, ...params },
  });
  return res.data;
};

// Get advance details by ID
export const getAdvanceDetails = async (advanceId) => {
  const res = await axios.get(`/advances/${advanceId}`);
  return res.data;
};

// Approve an advance request
export const approveAdvance = async (advanceId, approvalData) => {
  const res = await axios.put(`/advances/${advanceId}/approve`, approvalData);
  return res.data;
};

// Reject an advance request
export const rejectAdvance = async (advanceId, rejectionData) => {
  const res = await axios.put(`/advances/${advanceId}/reject`, rejectionData);
  return res.data;
};

// Get advance status counts for a factory
export const getAdvanceStatusCounts = async (factoryId, params = {}) => {
  const res = await axios.get(`/advances/${factoryId}/status-counts`, {
    params,
  });
  return res.data;
};
