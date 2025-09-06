import axios from "../axios";

// Get all inventory process trips for a factory
export const getLeafWeightTrips = async (factoryId) => {
  const res = await axios.get(`/inventory-process/factory/${factoryId}`);
  return res.data;
};

// Get trip details by tripId
export const getTripDetails = async (tripId) => {
  const res = await axios.get(`/trips/${tripId}`);
  return res.data;
};

// Get weighing session for a trip
export const getWeighingSessionByTrip = async (tripId) => {
  const res = await axios.get(`/weighing-sessions/trip/${tripId}`);
  return res.data;
};

// Get pending bags for a trip (arrived view)
export const getPendingBagsForTrip = async (tripId) => {
  const res = await axios.get(`/inventory-process/trip/${tripId}/bags/pending`);
  return res.data;
};

// Get bag weights summary by sessionId (completed view)
export const getBagWeightsBySession = async (sessionId) => {
  const res = await axios.get(`/bagweights/session/${sessionId}`);
  return res.data;
};

// Create a new weighing session
export const createWeighingSession = async (payload) => {
  // payload should contain { userId, tripId }
  const res = await axios.post(`/weighing-sessions`, payload);
  return res.data;
};

// Get bagWeightId for a supply request (returns id or empty)
export const getBagWeightIdBySupplyRequest = async (supplyRequestId) => {
  const res = await axios.get(
    `/inventory-process/supply-request/${supplyRequestId}/bagweight-id`,
    { responseType: "text" }
  );
  // server may return text or json; return parsed data if possible
  try {
    return res.data ? JSON.parse(res.data) : null;
  } catch {
    return res.data || null;
  }
};

// Create bag weights (POST)
export const createBagWeights = async (payload) => {
  const res = await axios.post(`/bagweights`, payload);
  return res.data;
};

// Update bag weights (PUT) by bagWeightId
export const updateBagWeights = async (bagWeightId, payload) => {
  const res = await axios.put(`/bagweights/${bagWeightId}`, payload);
  return res.data;
};

// Get trip status counts for a factory for today
export const getTripStatusCounts = async (factoryId) => {
  const res = await axios.get(
    `/trips/status-counts/factory/${factoryId}/today`
  );
  return res.data;
};

// Get trips for a factory filtered by status (supports pagination and search)
// Example: /api/trips/factory/{factoryId}/status/{status}/today?page=0&size=10&search=foo
export const getTripsByFactoryAndStatus = async (
  factoryId,
  status,
  page = 0,
  search = ""
) => {
  const params = { page };
  if (search) params.search = search;
  const res = await axios.get(
    `/trips/factory/${factoryId}/status/${status}/today`,
    {
      params,
    }
  );
  return res.data;
};
