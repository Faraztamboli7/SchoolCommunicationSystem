import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Communications from "./pages/Communications";
import CreateCommunication from "./pages/CreateCommunication";
import Tracking from "./pages/Tracking";
import Notifications from "./pages/Notifications";
// import CreateCommunication from "./pages/CreateCommunication";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />

          <Route
            path="/communications"
            element={
              <MainLayout>
                <Communications />
              </MainLayout>
            }
          />

          <Route
            path="/communications/create"
            element={
              <MainLayout>
                <CreateCommunication />
              </MainLayout>
            }
          />

          <Route
            path="/tracking"
            element={
              <MainLayout>
                <Tracking />
              </MainLayout>
            }
          />

          <Route
            path="/notifications"
            element={
              <MainLayout>
                <Notifications />
              </MainLayout>
            }
          />

        </Route>

        {/* Default */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

<Route
  path="/communications/create"
  element={<CreateCommunication />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;