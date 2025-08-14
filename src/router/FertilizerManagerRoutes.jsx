import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Stock from "../pages/FertilizerManager/Stock/stockList";
import Dashboard from "../pages/FertilizerManager/dashboard";
import ViewStock from "../pages/FertilizerManager/Stock/ViewStock";
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
    key="view_stock"
    path="/fertilizerManager/stock/view/:id"
    element={
      <Layout>
        <ViewStock />
      </Layout>
    }
  />,
  <Route
    key="stock_request"
    path="/fertilizerManager/stock/request"
    element={
      <Layout>
        <StockRequest />
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
