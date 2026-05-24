import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/main.css';

import Header from './components/Header';
import SideBar from './components/SideBar';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logout from './components/Logout';
import ForgotPassword from "./pages/ForgotPassword";
import PackageType from "./pages/PackageType";
import AddPackageType from "./pages/AddPackageType";

function App() {

  const isLoggedIn =
    sessionStorage.getItem("token") === "agent123";

  return (

    <div className="App">

      <Router>

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route
            path="/login"
            element={
              !isLoggedIn
                ? <Login />
                : <Navigate to="/" />
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />


          {/* PROTECTED ROUTES */}
          <Route
            path="/*"
            element={
              isLoggedIn ? (

                <div className="admin-layout">

                  <SideBar />

                  <div className="main-content">

                    <Header />

                    <Routes>

                      <Route
                        path="/"
                        element={<Dashboard />}
                      />

                      <Route
                        path="/logout"
                        element={<Logout />}
                      />

                      <Route
                        path="/package-types"
                        element={<PackageType />}
                      />

                      <Route
                        path="/add-package-type"
                        element={<AddPackageType />}
                      />

                      <Route
                        path="*"
                        element={<Navigate to="/" />}
                      />

                    </Routes>

                  </div>

                </div>

              ) : (

                <Navigate to="/login" />

              )
            }
          />

        </Routes>

      </Router>

    </div>
  );
}

export default App;