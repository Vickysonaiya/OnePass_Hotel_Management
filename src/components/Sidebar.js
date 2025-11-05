import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
import Calendar from "../assets/icons/calendar-cog.svg";
// import SettingsIcon from "../assets/icons/settings.svg"; // ✅ Add your settings icon here
import "./sidebar.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Sidebar = ({ show, onClose }) => {
  const [openReservations, setOpenReservations] = useState(false);
  const [openCreditAndBilling, setCreditAndBilling] = useState(false);
  const [openAccessSettings, setAccessSettings] = useState(false);
  const location = useLocation();

  // Keep dropdown open when user navigates directly to related pages
  useEffect(() => {
    if (
      location.pathname === "/reservation-entry" ||
      location.pathname === "/mis-report"
    ) {
      setOpenReservations(true);
      setCreditAndBilling(false);
      setAccessSettings(false);
    } else if (
      location.pathname === "/creditoverview" ||
      location.pathname === "/credit-consumption" ||
      location.pathname === "/billing-history"
    ) {
      setCreditAndBilling(true);
      setOpenReservations(false);
      setAccessSettings(false);
    } else if (location.pathname === "/access-settings") {
      setAccessSettings(true);
      setOpenReservations(false);
      setCreditAndBilling(false);
    } else {
      setOpenReservations(false);
      setCreditAndBilling(false);
      setAccessSettings(false);
    }
  }, [location]);

  // Close all dropdowns
  const closeAll = () => {
    setOpenReservations(false);
    setCreditAndBilling(false);
    setAccessSettings(false);
  };

  // Toggle handlers ensuring only one open at a time
  const toggleReservations = () => {
    setOpenReservations((prev) => {
      const newState = !prev;
      if (newState) {
        setCreditAndBilling(false);
        setAccessSettings(false);
      }
      return newState;
    });
  };

  const toggleCreditAndBilling = () => {
    setCreditAndBilling((prev) => {
      const newState = !prev;
      if (newState) {
        setOpenReservations(false);
        setAccessSettings(false);
      }
      return newState;
    });
  };

  const toggleAccessSettings = () => {
    setAccessSettings((prev) => {
      const newState = !prev;
      if (newState) {
        setOpenReservations(false);
        setCreditAndBilling(false);
      }
      return newState;
    });
  };

  return (
    <div
      className={`sidebar bg-white border-end p-3 position-fixed top-0 start-0 ${
        show ? "d-block" : "d-none d-md-block"
      }`}
      style={{
        width: "265px",
        height: "100vh",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <button
        className="btn btn-sm btn-outline-secondary d-md-none mb-3"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="d-flex align-items-center mb-2">
        <img
          src={onepasslogo}
          alt="avatar"
          className="me-2 logo"
          width={46}
          height={46}
        />
      </div>

      <nav className="nav flex-column">
        {/* ✅ Dashboard - closes all dropdowns */}
        <NavLink
          to="/"
          onClick={closeAll}
          className={({ isActive }) =>
            `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
          }
        >
          {({ isActive }) => (
            <span className="d-flex align-items-center">
              <img
                src={home}
                alt="Home"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Dashboard
            </span>
          )}
        </NavLink>

        {/* ✅ Credit & Billing */}
        <div className="mt-2">
          <button
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center w-100 ${
              openCreditAndBilling ? "open" : ""
            }`}
            onClick={toggleCreditAndBilling}
            type="button"
            aria-expanded={openCreditAndBilling}
          >
            <span className="d-flex align-items-center">
              <img
                src={Calendar}
                alt="Credit & Billing"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Credit & Billing
            </span>
            {openCreditAndBilling ? (
              <HiChevronUp size={20} />
            ) : (
              <HiChevronDown size={20} />
            )}
          </button>

          {openCreditAndBilling && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/creditoverview"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                Credit Overview
              </NavLink>

              <NavLink
                to="/credit-consumption"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                Credit Consumption
              </NavLink>

              <NavLink
                to="/billing-history"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                Billing History
              </NavLink>
            </div>
          )}
        </div>

        {/* ✅ Access & Settings */}
        <div className="mt-2">
          <button
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center w-100 ${
              openAccessSettings ? "open" : ""
            }`}
            onClick={toggleAccessSettings}
            type="button"
            aria-expanded={openAccessSettings}
          >
            <span className="d-flex align-items-center">
              <img
                src={Calendar}
                alt="Access & Settings"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Access & Settings
            </span>
            {openAccessSettings ? (
              <HiChevronUp size={20} />
            ) : (
              <HiChevronDown size={20} />
            )}
          </button>

          {openAccessSettings && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/access-settings"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                Access & Settings
              </NavLink>
            </div>
          )}
        </div>

        {/* ✅ Guest Verification */}
        <div className="mt-2">
          <button
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center w-100 ${
              openReservations ? "open" : ""
            }`}
            onClick={toggleReservations}
            type="button"
            aria-expanded={openReservations}
          >
            <span className="d-flex align-items-center">
              <img
                src={Calendar}
                alt="Guest Verification"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Guest Verification
            </span>
            {openReservations ? (
              <HiChevronUp size={20} />
            ) : (
              <HiChevronDown size={20} />
            )}
          </button>

          {openReservations && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/reservation-entry"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                Start New Verification
              </NavLink>

              <NavLink
                to="/mis-report"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
              >
                MIS Reports
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
