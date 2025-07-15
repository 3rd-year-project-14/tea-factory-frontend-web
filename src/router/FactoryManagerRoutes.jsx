import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";

// Factory Manager Components
import FactoryManagerDashboard from "../pages/FactoryManager/dashboard";
import SupplierRegister from "../pages/FactoryManager/Suppliers/SupplierRegister";
import SupplierDetailsPage from "../pages/FactoryManager/Suppliers/SupplierDetailsPage";
import RouteManagement from "../pages/FactoryManager/Routes/RouteManagement";
import InventoryManagement from "../pages/FactoryManager/Inventory/InventoryManagement";
import DriverManagement from "../pages/FactoryManager/Drivers/DriverManagement";

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
          <InventoryManagement />
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
