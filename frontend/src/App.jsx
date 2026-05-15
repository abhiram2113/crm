import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import AddClient from "./pages/AddClient";

function App() {

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
          element={<Dashboard />}
        />

        <Route
          path="/hr-dashboard"
          element={<HRDashboard />}
        />

        <Route
          path="/add-client"
          element={<AddClient />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;