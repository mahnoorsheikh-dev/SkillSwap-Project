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

// 1️⃣ Map of routes to page titles (all lowercase keys)
const pageTitles = {
  "/": "Home | SkillSwap",
  "/dashboard": "Dashboard | SkillSwap",
  "/findconnection": "Find Connection | SkillSwap",
  "/chats": "Chats | SkillSwap",
  "/auth": "Login / Signup | SkillSwap",
};

// 2️⃣ Wrapper to dynamically set page titles
function AppWrapper() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    // Exact route match
    if (pageTitles[path]) {
      document.title = pageTitles[path];
    } 
    // Dynamic route for profile pages
    else if (path.startsWith("/profile")) {
      document.title = "Profile | SkillSwap";
    } 
    // Default title
    else {
      document.title = "SkillSwap";
    }
  }, [location]);

  return <AppContent />;
}

// 3️⃣ Main app content
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
      {/* Navbar */}
      {userId ? <Navbar /> : <PublicNavbar />}

      {/* Routes */}
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

      {/* Footer */}
      <Footer />
    </>
  );
}

// 4️⃣ Export main App with Router
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}












// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Auth from "./pages/Auth.jsx";
// import Home from "./pages/Home.jsx";
// import Profile from "./pages/Profile.jsx";
// import FindConnection from "./pages/FindConnection.jsx";
// import Chats from "./pages/Chats.jsx";
// import Navbar from "./components/Navbar.jsx";
// import PublicNavbar from "./components/PublicNavbar.jsx";
// import Footer from "./components/Footer.jsx";
// import DashboardHome from "./pages/DashboardHome.jsx";

// function App() {
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setUserId(localStorage.getItem("userId"));
//     setLoading(false);
//   }, []);

//   if (loading) return null;

//   return (
//     <Router>
//       {userId ? <Navbar /> : <PublicNavbar />}

//       <Routes>
//         <Route
//           path="/"
//           element={userId ? <Navigate to="/dashboard" replace /> : <Home />}
//         />
//         {userId && <Route path="/dashboard" element={<DashboardHome />} />}
//         <Route path="/FindConnection" element={<FindConnection />} />
//         <Route path="/profile/:userId" element={<Profile />} />
//         <Route path="/chats" element={<Chats />} />
//         <Route path="/auth" element={<Auth />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// }

// export default App;
