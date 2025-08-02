import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import InventoryManagerDashboard from "../pages/InventoryManager/dashboard";
import LeafWeight from "../pages/InventoryManager/LeafWeight/leaf_weight";
import RouteLeaf from "../pages/InventoryManager/LeafWeight/route_leaf";
import LeafBagsWeight from "../pages/InventoryManager/LeafWeight/leaf_bags_weight";
import EmptyBagsWeight from "../pages/InventoryManager/BagWeight/bag_weight";
// import RouteBagsWeight from "../pages/InventoryManager/BagWeight/route_bags_weight";
// import SupplierBagsWeight from "../pages/InventoryManager/BagWeight/bag_weight_supplier";
// import WeightCondition from "../pages/InventoryManager/weight_condition";
import History from "../pages/InventoryManager/History/history";
// import SupplierAdd from "../pages/InventoryManager/Report/Addsupplier";
import CRUD from "../pages/InventoryManager/Report/inventorycrud";
import EmptySupplierBag from "../pages/InventoryManager/BagWeight/empty_bag_supplier";
import EmptySupplierBagAll from "../pages/InventoryManager/BagWeight/empty_bag_supplier_all";

export default [
  <Route
    key="dashboard"
    path="/inventoryManager/dashboard"
    element={
      <Layout>
        <InventoryManagerDashboard />
      </Layout>
    }
  />,
  <Route
    key="leaf_weight"
    path="/inventoryManager/leaf_weight"
    element={
      <Layout>
        <LeafWeight />
      </Layout>
    }
  >
    <Route path="route/:routeId" element={<RouteLeaf />}>
      <Route path="supplier/:supplierId" element={<LeafBagsWeight />} />
    </Route>
  </Route>,
  <Route
    key="empty_bags_weight"
    path="/inventoryManager/empty_bags_weight"
    element={
      <Layout>
        <EmptyBagsWeight />
      </Layout>
    }
  />,
  // <Route key="route_bags_weight" path="/inventoryManager/route_bags_weight" element={<Layout><RouteBagsWeight /></Layout>} />,
  // <Route key="bags_weight_supplier" path="/inventoryManager/bags_weight_supplier" element={<Layout><SupplierBagsWeight /></Layout>} />,
  <Route
    key="empty_bags_weight_supplier"
    path="/inventoryManager/empty_bags_weight_supplier"
    element={
      <Layout>
        <EmptySupplierBag />
      </Layout>
    }
  />,
  <Route
    key="empty_bags_weight_supplier_all"
    path="/inventoryManager/empty_bags_weight_supplier_all"
    element={
      <Layout>
        <EmptySupplierBagAll />
      </Layout>
    }
  />,
  <Route
    key="history"
    path="/inventoryManager/history"
    element={
      <Layout>
        <History />
      </Layout>
    }
  />,
  // <Route key="report" path="/inventoryManager/report" element={<Layout><SupplierAdd /></Layout>} />,
  <Route
    key="crud"
    path="/inventoryManager/crud"
    element={
      <Layout>
        <CRUD />
      </Layout>
    }
  />,
];
