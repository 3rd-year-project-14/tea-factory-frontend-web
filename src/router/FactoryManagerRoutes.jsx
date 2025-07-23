import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";

// Factory Manager Components
import FactoryManagerDashboard from "../pages/FactoryManager/dashboard";
import SupplierRegister from "../pages/FactoryManager/Suppliers/SupplierRegister";
import SupplierDetailsPage from "../pages/FactoryManager/Suppliers/SupplierDetailsPage";
import RouteManagement from "../pages/FactoryManager/Routes/RouteManagement";
import InventoryManagement from "../pages/FactoryManager/Inventory/InventoryManagement";
import InventoryRoutesPage from "../pages/FactoryManager/Inventory/InventoryRoutesPage";
import InventorySuppliersPage from "../pages/FactoryManager/Inventory/InventorySuppliersPage";
import InventorySupplierDetailPage from "../pages/FactoryManager/Inventory/InventorySupplierDetailPage";
import DriverManagement from "../pages/FactoryManager/Drivers/DriverManagement";
// Payment Manager Components
import PaymentManagerDashboard from "../pages/PaymentManager/dashboard";
import AdvanceManagement from "../pages/PaymentManager/Advance/AdvanceManagement";
import LoanManagement from "../pages/PaymentManager/Loans/LoanManagement";
import TeaRateAdjustment from "../pages/PaymentManager/TeaRate/TeaRateAdjustment";
import PaymentManagement from "../pages/PaymentManager/Payments/PaymentManagement";

const FactoryManagerRoutes = (
  <>
    <Route
      path="/factoryManager/dashboard"
      element={
        <Layout>
          <FactoryManagerDashboard />
        </Layout>
      }
    />
    {/* Payment Manager routes under Factory Manager */}
    <Route
      path="/factoryManager/payment/dashboard"
      element={
        <Layout>
          <PaymentManagerDashboard />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/payment/advance"
      element={
        <Layout>
          <AdvanceManagement />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/payment/loans"
      element={
        <Layout>
          <LoanManagement />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/payment/payments"
      element={
        <Layout>
          <PaymentManagement />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/payment/teaRate"
      element={
        <Layout>
          <TeaRateAdjustment />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/suppliers"
      element={
        <Layout>
          <SupplierRegister />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/suppliers/:id"
      element={
        <Layout>
          <SupplierDetailsPage />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/suppliers/pending"
      element={
        <Layout>
          <SupplierRegister />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/suppliers/rejected"
      element={
        <Layout>
          <SupplierRegister />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/drivers"
      element={
        <Layout>
          <DriverManagement />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/inventory"
      element={
        <Layout>
          <InventoryRoutesPage />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/inventory/routes/:routeId"
      element={
        <Layout>
          <InventorySuppliersPage />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/inventory/routes/:routeId/:supplierId"
      element={
        <Layout>
          <InventorySupplierDetailPage />
        </Layout>
      }
    />
    <Route
      path="/factoryManager/routes"
      element={
        <Layout>
          <RouteManagement />
        </Layout>
      }
    />
  </>
);

export default FactoryManagerRoutes;
