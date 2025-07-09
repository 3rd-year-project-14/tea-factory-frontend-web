import React from "react";

const PaymentManagerDashboard = () => {
  return (
    <div className="payment-manager-dashboard">
      <h1>Payment Manager Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Advance Management</h3>
            <p>Manage advance payments and requests</p>
          </div>
          <div className="dashboard-card">
            <h3>Loan Management</h3>
            <p>Handle loan applications and processing</p>
          </div>
          <div className="dashboard-card">
            <h3>Payment Processing</h3>
            <p>Process and manage payments</p>
          </div>
          <div className="dashboard-card">
            <h3>Tea Rate Management</h3>
            <p>Adjust and manage tea rates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagerDashboard;
