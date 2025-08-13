import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import Profile from "../components/ui/Profile";

// import inventoryManagerRoutes from "./InventoryManagerRoutes";
import inventoryManagerRoutes from "./InventoryManagerRoutes";
import fertilizerManagerRoutes from "./FertilizerManagerRoutes";

import TransportManagerRoutes from "./TransportManagerRoutes";

import FactoryManagerRoutes from "./FactoryManagerRoutes";
import OwnerRoutes from "./OwnerRoutes";

//Factory Manager - Now handled by FactoryManagerRoutes.jsx

//Payment Manager
import PaymentManagerDashboard from "../pages/PaymentManager/dashboard";
import AdvanceManagement from "../pages/PaymentManager/Advance/AdvanceManagement";
import LoanManagement from "../pages/PaymentManager/Loans/LoanManagement";
import TeaRateAdjustment from "../pages/PaymentManager/TeaRate/TeaRateAdjustment";
import PaymentManagement from "../pages/PaymentManager/Payments/PaymentManagement";

//Transport Manager
import TransportManagerDashboard from "../pages/TransportManager/dashboard";
import Vehicle from "../pages/TransportManager/Vehicle/VehicleList";
import TrackRoutes from "../pages/TransportManager/Route/RouteList";
import Emergency from "../pages/TransportManager/Emergency/EmergencyList";
import Assignment from "../pages/TransportManager/RoutePlanner/RoutePlan";

import { useAuth } from "../contexts/AuthContext";
import Auth from "../components/Auth";
import Landing from "../components/landingNew";
import SignupForm from "../components/SignupForm";
import ForgotPassword from "../components/ui/ForgotPassword";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "INVENTORY_MANAGER" && inventoryManagerRoutes}
        {user?.role === "FERTILIZER_MANAGER" && fertilizerManagerRoutes}
        {user?.role === "OWNER" && OwnerRoutes}
        {user?.role === "FACTORY_MANAGER" && FactoryManagerRoutes}
        {user?.role === "TRANSPORT_MANAGER" && TransportManagerRoutes}
        
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="" element={<Navigate to="/landing" />} />
        {/* <Route path="" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
