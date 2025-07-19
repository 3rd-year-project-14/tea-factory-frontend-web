import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import TransportManagerDashboard from "../pages/TransportManager/dashboard";
import Vehicle from "../pages/TransportManager/Vehicle/VehicleList";
import AddVehicle from "../pages/TransportManager/Vehicle/AddVehicle";
import EditVehicle from "../pages/TransportManager/Vehicle/EditVehicle";
import ViewVehicle from "../pages/TransportManager/Vehicle/ViewVehicle";
import TrackRoutes from "../pages/TransportManager/Route/RouteList";
import Emergency from "../pages/TransportManager/Emergency/EmergencyList";
import RoutePlan from "../pages/TransportManager/RoutePlanner/RoutePlan";
import CreateRoute from "../pages/TransportManager/Route/CreateRoute";

const transportManagerRoutes = [
  <Route
    key="dashboard"
    path="/transportManager/dashboard"
    element={
      <Layout>
        <TransportManagerDashboard />
      </Layout>
    }
  />,
  <Route
    key="vehicle"
    path="/transportManager/vehicle"
    element={
      <Layout>
        <Vehicle />
      </Layout>
    }
  />,
  <Route
    key="add_vehicle"
    path="/transportManager/vehicle/add"
    element={
      <Layout>
        <AddVehicle />
      </Layout>
    }
  />,
  <Route
    key="edit_vehicle"
    path="/transportManager/vehicle/edit/:id"
    element={
      <Layout>
        <EditVehicle />
      </Layout>
    }
  />,
  <Route
    key="view_vehicle"
    path="/transportManager/vehicle/view/:id"
    element={
      <Layout>
        <ViewVehicle />
      </Layout>
    }
  />,
  <Route
    key="track_routes"
    path="/transportManager/routeList"
    element={
      <Layout>
        <TrackRoutes />
      </Layout>
    }
  />,
  <Route
    key="create_route"
    path="/transportManager/route/add"
    element={
      <Layout>
        <CreateRoute />
      </Layout>
    }
  />,
  <Route
    key="emergency"
    path="/transportManager/emergency"
    element={
      <Layout>
        <Emergency />
      </Layout>
    }
  />,
  <Route
    key="route_plan"
    path="/transportManager/routePlan"
    element={
      <Layout>
        <RoutePlan />
      </Layout>
    }
  />,
];

export default transportManagerRoutes;
