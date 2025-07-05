import React from "react";
import { Route } from "react-router-dom";
import Layout from "../layouts/Layout";

import OwnerTeaRate from "../pages/Owner/TeaRate/teaRate";
import OwnerDashboard from "../pages/Owner/dashboard";
import OwnerManagers from "../pages/Owner/Managerview/viewManagers";
import OwnerAnnoucement from "../pages/Owner/Annoucement/viewAnnoucement";
import OwnerReports from "../pages/Owner/Reports/reports";
import OwnerPaymnets from "../pages/Owner/Payments/payment";
import AddManagers from "../pages/Owner/ManagerView/addManagers";
import GiveAccess from "../pages/Owner/ManagerView/giveaccess";
import AddAnnouncement from "../pages/Owner/Annoucement/addAnnouncement";

export default [
    <>
    <Route path="/owner/dashboard" element={<Layout>{" "}<OwnerDashboard />{" "}</Layout>}/>
    <Route path="/owner/teaRate" element={<Layout>{" "}<OwnerTeaRate />{" "}</Layout>}/>
    <Route path="/owner/managers" element={<Layout>{" "}<OwnerManagers />{" "}</Layout>}/>
    <Route path="/owner/annoucement" element={<Layout>{" "}<OwnerAnnoucement />{" "}</Layout>}/>
    <Route path="/owner/reports" element={<Layout>{" "}<OwnerReports />{" "}</Layout>}/>
    <Route path="/owner/payments" element={<Layout>{" "}<OwnerPaymnets />{" "}</Layout>}/>
    <Route path="/Owner/ManagerView/addManagers" element={<Layout>{" "}<AddManagers />{"  "}</Layout>}/>
    <Route path="/Owner/ManagerView/giveaccess" element={<Layout>{" "}<GiveAccess />{" "}</Layout>}/>
    <Route path="/owner/annoucement/add" element={<Layout>{" "}<AddAnnouncement />{" "}</Layout>}/>
    </>
];