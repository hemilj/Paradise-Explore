import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { useEffect } from "react";

import "./styles/main.css";

import {
  initializeAnimations,
  initializeCounter,
  initializeSlider
} from "./scripts/main";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppLayout() {

  const location = useLocation();

  // Pages where Header/Footer should be hidden
  const hideLayoutRoutes = [
    "/login",
    "/register"
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  useEffect(() => {

    initializeAnimations();
    initializeCounter();
    initializeSlider();

  }, [location.pathname]);

  return (

    <div className="App">

      {!hideLayout && <Header />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/blogs" element={<Blogs />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>

      {!hideLayout && <Footer />}

    </div>

  );
}

function App() {

  return (

    <Router>
      <AppLayout />
    </Router>

  );
}

export default App;