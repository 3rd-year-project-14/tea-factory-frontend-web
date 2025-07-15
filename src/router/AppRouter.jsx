import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";

// import inventoryManagerRoutes from "./InventoryManagerRoutes";
import inventoryManagerRoutes from "./InventoryManagerRoutes";
import fertilizerManagerRoutes from "./FertilizerManagerRoutes";
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
import Vehicle from "../pages/TransportManager/vehicle";
import TrackRoutes from "../pages/TransportManager/trackRoutes";
import Emergency from "../pages/TransportManager/emergency";
import Assignment from "../pages/TransportManager/assignments";

//owner
// import OwnerTeaRate from "../pages/Owner/TeaRate/teaRate";
// import OwnerDashboard from "../pages/Owner/dashboard";
// import OwnerManagers from "../pages/Owner/Managerview/viewManagers";
// import OwnerAnnoucement from "../pages/Owner/Annoucement/viewAnnoucement";
// import OwnerReports from "../pages/Owner/Reports/reports";
// import OwnerPaymnets from "../pages/Owner/Payments/payment";
// import AddManagers from "../pages/Owner/ManagerView/addManagers";
// import GiveAccess from "../pages/Owner/ManagerView/giveaccess";

import { useAuth } from "../contexts/AuthContext";
import Auth from "../components/Auth";
import Landing from "../components/landingNew";
import SignupForm from "../components/SignupForm";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "INVENTORY_MANAGER" && inventoryManagerRoutes}

        {user?.role === "FERTILIZER_MANAGER" && fertilizerManagerRoutes}

        {user?.role === "OWNER" && OwnerRoutes}

        {user?.role === "TRANSPORT_MANAGER" && (
          <>
            <Route
              path="/transportManager/dashboard"
              element={
                <Layout>
                  <TransportManagerDashboard />
                </Layout>
              }
            />
            <Route
              path="/transportManager/vehicle"
              element={
                <Layout>
                  <Vehicle />
                </Layout>
              }
            />
            <Route
              path="/transportManager/trackRoutes"
              element={
                <Layout>
                  <TrackRoutes />
                </Layout>
              }
            />
            <Route
              path="/transportManager/assignments"
              element={
                <Layout>
                  <Assignment />
                </Layout>
              }
            />
            <Route
              path="/transportManager/emergency"
              element={
                <Layout>
                  <Emergency />
                </Layout>
              }
            />
          </>
        )}

        {user?.role === "FACTORY_MANAGER" && FactoryManagerRoutes}

        {user?.role === "PAYMENT_MANAGER" && (
          <>
            <Route
              path="/paymentManager/dashboard"
              element={
                <Layout>
                  <PaymentManagerDashboard />
                </Layout>
              }
            />
            <Route
              path="/paymentManager/advance"
              element={
                <Layout>
                  <AdvanceManagement />
                </Layout>
              }
            />
            <Route
              path="/paymentManager/loans"
              element={
                <Layout>
                  <LoanManagement />
                </Layout>
              }
            />
            <Route
              path="/paymentManager/payments"
              element={
                <Layout>
                  <PaymentManagement />
                </Layout>
              }
            />
            <Route
              path="/paymentManager/teaRate"
              element={
                <Layout>
                  <TeaRateAdjustment />
                </Layout>
              }
            />
          </>
        )}

        {/* {user?.role === "OWNER" && (
          <>

          <Route path="/owner/dashboard" element={<Layout>{" "}<OwnerDashboard />{" "}</Layout>}/>
          <Route path="/owner/teaRate" element={<Layout>{" "}<OwnerTeaRate />{" "}</Layout>}/>
          <Route path="/owner/managers" element={<Layout>{" "}<OwnerManagers />{" "}</Layout>}/>
          <Route path="/owner/annoucement" element={<Layout>{" "}<OwnerAnnoucement />{" "}</Layout>}/>
          <Route path="/owner/reports" element={<Layout>{" "}<OwnerReports />{" "}</Layout>}/>
          <Route path="/owner/payments" element={<Layout>{" "}<OwnerPaymnets />{" "}</Layout>}/>
          <Route path="/Owner/ManagerView/addManagers" element={<Layout>{" "}<AddManagers />{"  "}</Layout>}/>
          <Route path="/Owner/ManagerView/giveaccess" element={<Layout>{" "}<GiveAccess />{" "}</Layout>}/>

            
          </>
        )} */}

        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="" element={<Navigate to="/landing" />} />

        {/* <Route path="" element={<Navigate to="/login" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
