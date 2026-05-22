import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from "./pages/Users";
import Agents from "./pages/Agents";
import './styles/main.css';
import Logout from "./components/Logout";

function App() {
  const isLoggedIn = sessionStorage.getItem("token") === "admin123";

  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div className="admin-layout">
                <SideBar />
                <div className="admin-content">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="*" element={<Navigate to="/" />} />
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
  );
}

export default App;
