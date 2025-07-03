import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Stock from "../pages/FertilizerManager/Stock/stockList";
import Dashboard from "../pages/FertilizerManager/dashboard";
import AddStock from "../pages/FertilizerManager/Stock/AddStock";
import ViewStock from "../pages/FertilizerManager/Stock/ViewStock";
import EditStock from "../pages/FertilizerManager/Stock/EditStock";


export default [
  <Route path="/fertilizerManager/dashboard" element={<Layout><Dashboard /></Layout>} />,
  <Route path="/fertilizerManager/stock" element={<Layout><Stock /></Layout>} />,
  <Route key="add_stock" path="/inventoryManager/add_stock" element={<Layout><AddStock /></Layout>} />,
  <Route key="view_stock" path="/inventoryManager/view_stock" element={<Layout><ViewStock /></Layout>} />,
  <Route key="edit_stock" path="/inventoryManager/edit_stock" element={<Layout><EditStock /></Layout>} />
];
