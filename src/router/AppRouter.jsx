import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout"

import SupplierDashboard from "../pages/supplier/Dashboard";
import DriverDashboard from "../pages/driver/Dashboard";
import TransportManagerDashboard from "../pages/TransportManager/Dashboard";
import FertilizerManagerDashboard from "../pages/FertilizerManager/dashboard";
import InventoryManagerDashboard from "../pages/InventoryManager/dashboard";
import LeafWeight from "../pages/InventoryManager/leaf_weight";
import RouteLeaf from "../pages/InventoryManager/route_leaf";
import WeightCondition from "../pages/InventoryManager/weight_condition";

import FertilizerManagerWeight from "../pages/FertilizerManager/weight";
import Login from "../pages/login";

import { useAuth } from "../contexts/AuthContext";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {user?.role === "INVENTORY_MANAGER" && (
          <>
            <Route path="/inventoryManager/dashboard" element={<Layout>{" "}<InventoryManagerDashboard />{" "}</Layout>}/>
            <Route path="/inventoryManager/leaf_weight" element={<Layout>{" "}<LeafWeight />{" "}</Layout>}/>
            <Route path="/inventoryManager/route_leaf" element={<Layout>{" "}<RouteLeaf />{" "}</Layout>}/>
            <Route path="/inventoryManager/weight_condition" element={<Layout>{" "}<WeightCondition/>{" "}</Layout>}/>
          </>
        )}

        {user?.role === "FERTILIZER_MANAGER" && (
          <Route path="/fertilizerManager/dashboard" element={<Layout><TransportManagerDashboard /></Layout>}/>
        )}

        {user?.role === "TRANSPORT_MANAGER" && (
          <Route path="/transportManager/dashboard" element={<Layout><TransportManagerDashboard /></Layout>}/>
        )}

        {user?.role === "FACTORY_MANAGER" && (
          <Route path="/transportManager/dashboard" element={<Layout><TransportManagerDashboard /></Layout>}/>
        )}

        {user?.role === "OWNER" && (
          <Route path="/transportManager/dashboard" element={<Layout><TransportManagerDashboard /></Layout>}/>
        )}

        <Route path="/login" element={<Login />} />

        <Route path="" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
