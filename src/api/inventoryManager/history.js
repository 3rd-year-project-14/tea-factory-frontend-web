import axios from "../axios";

// API functions for inventory manager
export const getInventoryManagerDashboard = async () => {
  // ...implement get inventory manager dashboard API call...
};

export const getInventoryManagersByFactory = async (factoryId) => {
  const res = await axios.get(`/users/inventory-managers/${factoryId}`);
  return res.data;
};

// Get paginated bag weights
export const getBagWeights = async (factoryId, params) => {
  const res = await axios.get(`/inventory-process/${factoryId}/bagweights`, {
    params,
  });
  return res.data;
};
