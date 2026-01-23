import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      {userId ? <Navbar /> : <PublicNavbar />}

      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate to="/dashboard" replace /> : <Home />}
        />
        {userId && <Route path="/dashboard" element={<DashboardHome />} />}
        <Route path="/FindConnection" element={<FindConnection />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
