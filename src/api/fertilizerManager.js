// Approve fertilizer request (new endpoint)
export async function approveFertilizerRequest(id) {
  const { data } = await axios.patch(`/fertilizer-requests/${id}/approve`);
  return data;
}

// Reject fertilizer request (new endpoint)
export async function rejectFertilizerRequest(id, rejectReason) {
  const { data } = await axios.patch(`/fertilizer-requests/${id}/reject`, { rejectReason });
  return data;
}
// Get all fertilizer stocks
export async function getAllFertilizerStocks() {
  const { data } = await axios.get("/fertilizer-stocks");
  return data;
}
// Create fertilizer stock (connects to backend DTO)
export async function createFertilizerStock(payload) {
  const { data } = await axios.post("/fertilizer-stocks", payload);
  return data;
}
// File: src/api/fertilizerManager.js
// Axios API client for fertilizer requests aligned with backend controller
// Uses shared axios instance that already sets Authorization header
import axios from "./axios";

const base = "/fertilizer-requests";

// Create single request
// payload: { categoryId, companyId, userId, quantity, note?, description? }
export async function createFertilizerRequest(payload) {
  const { data } = await axios.post(base, payload);
  return data;
}

// Create batch
// payload: { requests: CreateFertilizerRequestDTO[] }
export async function createFertilizerRequestsBatch(payload) {
  const { data } = await axios.post(`${base}/batch`, payload);
  return data;
}

// Get all (optional status filter: PENDING|APPROVED|REJECTED|FULFILLED)
export async function getAllFertilizerRequests(status) {
  const url = status ? `${base}?status=${encodeURIComponent(status)}` : base;
  const { data } = await axios.get(url);
  return data;
}

// Get by id
export async function getFertilizerRequestById(id) {
  const { data } = await axios.get(`${base}/${id}`);
  return data;
}

// Get by user
export async function getFertilizerRequestsByUser(userId) {
  const { data } = await axios.get(`${base}/user/${userId}`);
  return data;
}

// Get by user and status
export async function getFertilizerRequestsByUserAndStatus(userId, status) {
  const { data } = await axios.get(`${base}/user/${userId}/status/${status}`);
  return data;
}

// Update status (body: { status, rejectReason? })
export async function updateFertilizerRequestStatus(id, payload) {
  const { data } = await axios.patch(`${base}/${id}/status`, payload);
  return data;
}