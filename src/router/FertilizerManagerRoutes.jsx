import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Stock from "../pages/FertilizerManager/Stock/stockList";
import Dashboard from "../pages/FertilizerManager/dashboard";
import AddStock from "../pages/FertilizerManager/Stock/AddStock";
import ViewStock from "../pages/FertilizerManager/Stock/ViewStock";
import EditStock from "../pages/FertilizerManager/Stock/EditStock";
import Request from "../pages/FertilizerManager/Request/supplierRequest";
import StockRequest from "../pages/FertilizerManager/Stock/stockRequest";
import ReportPage from "../pages/FertilizerManager/Report/report";
// import History from "../pages/FertilizerManager/History/history";

export default [
  <Route
    path="/fertilizerManager/dashboard"
    element={
      <Layout>
        <Dashboard />
      </Layout>
    }
  />,
  <Route
    path="/fertilizerManager/stock"
    element={
      <Layout>
        <Stock />
      </Layout>
    }
  />,
  <Route
    key="add_stock"
    path="/inventoryManager/add_stock"
    element={
      <Layout>
        <AddStock />
      </Layout>
    }
  />,
  <Route
    key="view_stock"
    path="/inventoryManager/view_stock"
    element={
      <Layout>
        <ViewStock />
      </Layout>
    }
  />,
  <Route
    key="request"
    path="/fertilizerManager/request"
    element={
      <Layout>
        <Request />
      </Layout>
    }
  />,
  <Route
    key="stock_request"
    path="/fertilizerManager/stockRequest"
    element={
      <Layout>
        <StockRequest />
      </Layout>
    }
  />,
  <Route
    key="report"
    path="/fertilizerManager/report"
    element={
      <Layout>
        <ReportPage />
      </Layout>
    }
  />,
  // <Route
  //   key="history"
  //   path="/fertilizerManager/history"
  //   element={
  //     <Layout>
  //       <History />
  //     </Layout>
  //   }
  // />,
  
];
