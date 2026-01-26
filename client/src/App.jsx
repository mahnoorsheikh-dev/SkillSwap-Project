import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import FindConnection from "./pages/FindConnection.jsx";
import Chats from "./pages/Chats.jsx";
import Navbar from "./components/Navbar.jsx";
import PublicNavbar from "./components/PublicNavbar.jsx";
import Footer from "./components/Footer.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";

const pageTitles = {
  "/": "Home | SkillSwap",
  "/dashboard": "Dashboard | SkillSwap",
  "/findconnection": "Find Connection | SkillSwap",
  "/chats": "Chats | SkillSwap",
  "/auth": "Login / Signup | SkillSwap",
};

function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (pageTitles[path]) {
      document.title = pageTitles[path];
    } 
    else if (path.startsWith("/profile")) {
      document.title = "Profile | SkillSwap";
    } 
    else {
      document.title = "SkillSwap";
    }
  }, [location]);

  return <AppContent />;
}

function AppContent() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <>
      {userId ? <Navbar /> : <PublicNavbar />}

      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate to="/dashboard" replace /> : <Home />}
        />
        {userId && <Route path="/dashboard" element={<DashboardHome />} />}
        <Route path="/findconnection" element={<FindConnection />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

