import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import TransportManagerDashboard from "../pages/TransportManager/dashboard";
import Vehicle from "../pages/TransportManager/vehicle";
import AddVehicle from "../pages/TransportManager/Vehicle/addVehicle";
import EditVehicle from "../pages/TransportManager/Vehicle/editVehicle";
import ViewVehicle from "../pages/TransportManager/Vehicle/viewVehicle";
import TrackRoutes from "../pages/TransportManager/trackRoutes";
import Emergency from "../pages/TransportManager/emergency";
import Assignment from "../pages/TransportManager/assignments";

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
    path="/transportManager/track_routes"
    element={
      <Layout>
        <TrackRoutes />
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
    key="assignments"
    path="/transportManager/assignments"
    element={
      <Layout>
        <Assignment />
      </Layout>
    }
  />,
];

export default transportManagerRoutes;
