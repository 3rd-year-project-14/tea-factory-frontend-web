import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupplierLayout from "../layouts/SupplierLayout";
import DriverLayout from "../layouts/DriverLayout";
import SupplierDashboard from "../pages/supplier/Dashboard";
import DriverDashboard from "../pages/driver/Dashboard";
// import { useAuth } from "../contexts/DriverAuth/AuthContext1";
import { useAuth } from "../contexts/AuthContext";



export default function AppRouter() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        {user?.role === "SUPPLIER" && (
          <Route
            path="/supplier/dashboard"
            element={
              <SupplierLayout>
                <SupplierDashboard />
              </SupplierLayout>
            }
          />
        )}

        {user?.role === "DRIVER" && (
          <Route
            path="/driver/dashboard"
            element={
              <DriverLayout>
                <DriverDashboard />
              </DriverLayout>
            }
          />
        )}

        <Route path="" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
