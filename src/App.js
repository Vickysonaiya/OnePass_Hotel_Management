import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AllGuestRecords from "./pages/AllGuestRecords";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";
import DateHoursFilter from "./components/Filter/DateHoursFilter";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="loginForm">
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      <div className="flex-grow-1 main-content">
        <Header onSidebarToggle={() => setShowSidebar(true)} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AllGuestRecords" element={<AllGuestRecords />} />

            <Route path="/DateHoursFilter" element={<DateHoursFilter />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
