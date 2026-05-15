import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import AddClient from "./pages/AddClient";

function App() {

  const employeeLoggedIn =
    localStorage.getItem("isLoggedIn");

  const hrLoggedIn =
    localStorage.getItem("isHRLoggedIn");

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            employeeLoggedIn
              ? <Dashboard />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/add-client"
          element={
            employeeLoggedIn
              ? <AddClient />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/hr-dashboard"
          element={
            hrLoggedIn
              ? <HRDashboard />
              : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;