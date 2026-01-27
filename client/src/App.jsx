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

function PageTitleUpdater({ userId }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (pageTitles[path]) {
      document.title = pageTitles[path];
    } else if (path.startsWith("/profile")) {
      document.title = "Profile | SkillSwap";
    } else {
      document.title = "SkillSwap";
    }
  }, [location, userId]);

  return null;
}

function AppContent() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    setLoading(false);

    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <PageTitleUpdater userId={userId} />

      {userId ? <Navbar /> : <PublicNavbar />}

      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate to="/dashboard" replace /> : <Home />}
        />

        {userId && <Route path="/dashboard" element={<DashboardHome />} />}

        {userId && <Route path="/findconnection" element={<FindConnection />} />}

        <Route path="/profile/:userId" element={<Profile />} />

        {userId && <Route path="/chats" element={<Chats />} />}

        <Route
          path="/auth"
          element={userId ? <Navigate to="/dashboard" replace /> : <Auth />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
