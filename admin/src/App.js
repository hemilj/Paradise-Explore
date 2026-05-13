import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from "./pages/Users";
import Agents from "./pages/Agents";
import './styles/main.css';

function App() {
  const isLoggedIn = true; // Toggle to false to see Login page

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    // Router wraps the ENTIRE layout so SideBar can use NavLink
    <Router>
      <div className="admin-layout">

        {/* Left Sidebar — uses NavLink, needs to be inside <Router> */}
        <SideBar />

        {/* Right: Header pinned + scrollable page content */}
        <div className="admin-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/agents" element={<Agents />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
