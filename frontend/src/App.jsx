import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Main/Dashboard";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import CreateProduct from "./pages/Main/CreateProduct";
import ProductList from "./pages/Main/ProductList";
import CreatePurchaseOrder from "./pages/Main/CreatePurchaseOrder";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      <Route path="/" element={<MainLayout />}>
        {/* Redirect / to /dashboard */}
        <Route
          index
          element={
            <PrivateRoute>
              <Navigate to="/dashboard" />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="create-product"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="create-pruchase-order"
          element={
            <PrivateRoute>
              <CreatePurchaseOrder />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default App;
