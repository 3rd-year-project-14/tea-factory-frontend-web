import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";

import FertlizerManagerDashboard from "../pages/FertilizerManager/dashboard";



//Inventory Manager
import InventoryManagerDashboard from "../pages/InventoryManager/dashboard";
import LeafWeight from "../pages/InventoryManager/LeafWeight/leaf_weight";
import RouteLeaf from "../pages/InventoryManager/LeafWeight/route_leaf";
import LeafBagsWeight from "../pages/InventoryManager/LeafWeight/leaf_bags_weight";
import EmptyBagsWeight from "../pages/InventoryManager/BagWeight/bag_weight";
import RouteBagsWeight from "../pages/InventoryManager/BagWeight/route_bags_weight";
import SupplierBagsWeight from "../pages/InventoryManager/BagWeight/bag_weight_supplier";
import WeightCondition from "../pages/InventoryManager/weight_condition";

import History from "../pages/InventoryManager/History/history";
import SupplierAdd from "../pages/InventoryManager/Report/Addsupplier";

//Factory Manager
import FactoryManagerDashboard from "../pages/FactoryManager/dashboard";
import SupplierRegister from "../pages/FactoryManager/Suppliers/supplierRegister";
import AdvanceManagement from "../pages/FactoryManager/Advance/AdvanceManagement";
import LoanManagement from "../pages/FactoryManager/Loans/LoanManagement";
import TeaRateAdjustment from "../pages/FactoryManager/TeaRate/TeaRateAdjustment";
import PaymentManagement from "../pages/FactoryManager/Payments/PaymentManagement";
import RouteManagement from "../pages/FactoryManager/Routes/RouteManagement";
import InventoryManagement from "../pages/FactoryManager/Inventory/InventoryManagement";
import DriverManagement from "../pages/FactoryManager/Drivers/DriverManagement";


//Transport Manager
import TransportManagerDashboard from "../pages/TransportManager/dashboard";
import Vehicle from "../pages/TransportManager/vehicle";
import TrackRoutes from "../pages/TransportManager/trackRoutes";
import Emergency from "../pages/TransportManager/emergency";
import Assignment from "../pages/TransportManager/assignments";

//Fertilizer Manager
import FertilizerManagerDashboard from "../pages/FertilizerManager/dashboard";



//owner
import OwnerTeaRate from "../pages/Owner/TeaRate/teaRate";
import OwnerDashboard from "../pages/Owner/dashboard";
import OwnerManagers from "../pages/Owner/Managerview/viewManagers";
import OwnerAnnoucement from "../pages/Owner/Annoucement/viewAnnoucement";
import OwnerReports from "../pages/Owner/Reports/reports";
import OwnerPaymnets from "../pages/Owner/Payments/payment";

import { useAuth } from "../contexts/AuthContext";
import Login from "../pages/login";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "INVENTORY_MANAGER" && (
          <>
            <Route
              path="/inventoryManager/dashboard"
              element={
                <Layout>
                  {" "}
                  <InventoryManagerDashboard />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/leaf_weight"
              element={
                <Layout>
                  {" "}
                  <LeafWeight />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/route_leaf"
              element={
                <Layout>
                  {" "}
                  <RouteLeaf />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/weight_condition"
              element={
                <Layout>
                  {" "}
                  <WeightCondition />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/weight_bags_weight"
              element={
                <Layout>
                  {" "}
                  <LeafBagsWeight />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/empty_bags_weight"
              element={
                <Layout>
                  {" "}
                  <EmptyBagsWeight />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/route_bags_weight"
              element={
                <Layout>
                  {" "}
                  <RouteBagsWeight />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/bags_weight_supplier"
              element={
                <Layout>
                  {" "}
                  <SupplierBagsWeight />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/history"
              element={
                <Layout>
                  {" "}
                  <History />{" "}
                </Layout>
              }
            />
            <Route
              path="/inventoryManager/report"
              element={
                <Layout>
                  {" "}
                  <SupplierAdd />{" "}
                </Layout>
              }
            />
          </>
        )}

        {user?.role === "FERTILIZER_MANAGER" && (
          <>
            <Route
              path="/fertilizerManager/dashboard"
              element={
                <Layout>
                  {" "}
                  <FertilizerManagerDashboard />{" "}
                </Layout>
              }
            />
            
          </>
        )}

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

        {user?.role === "FACTORY_MANAGER" && (
          <>
            <Route
              path="/factoryManager/dashboard"
              element={
                <Layout>
                  {" "}
                  <FactoryManagerDashboard />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/suppliers"
              element={
                <Layout>
                  {" "}
                  <SupplierRegister />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/drivers"
              element={
                <Layout>
                  {" "}
                  <DriverManagement />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/advance"
              element={
                <Layout>
                  {" "}
                  <AdvanceManagement />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/inventory"
              element={
                <Layout>
                  {" "}
                  <InventoryManagement />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/loans"
              element={
                <Layout>
                  {" "}
                  <LoanManagement />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/teaRate"
              element={
                <Layout>
                  {" "}
                  <TeaRateAdjustment />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/payments"
              element={
                <Layout>
                  {" "}
                  <PaymentManagement />{" "}
                </Layout>
              }
            />
            <Route
              path="/factoryManager/routes"
              element={
                <Layout>
                  {" "}
                  <RouteManagement />{" "}
                </Layout>
              }
            />
            
          </>
        )}

        {user?.role === "OWNER" && (
          <>
            <Route
              path="/owner/dashboard"
              element={
                <Layout>
                  {" "}
                  <OwnerDashboard />{" "}
                </Layout>
              }
            />
            <Route
              path="/owner/teaRate"
              element={
                <Layout>
                  {" "}
                  <OwnerTeaRate />{" "}
                </Layout>
              }
            />
            <Route
              path="/owner/managers"
              element={
                <Layout>
                  {" "}
                  <OwnerManagers />{" "}
                </Layout>
              }
            />
            <Route
              path="/owner/annoucement"
              element={
                <Layout>
                  {" "}
                  <OwnerAnnoucement />{" "}
                </Layout>
              }
            />
            <Route
              path="/owner/reports"
              element={
                <Layout>
                  {" "}
                  <OwnerReports />{" "}
                </Layout>
              }
            />
            <Route
              path="/owner/payments"
              element={
                <Layout>
                  {" "}
                  <OwnerPaymnets />{" "}
                </Layout>
              }
            />
          </>
        )}

        <Route path="/login" element={<Login />} />

        <Route path="" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
