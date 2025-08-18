import React from "react";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
import Calendar from "../assets/icons/calendar-cog.svg";
import Phone from "../assets/icons/smartphone.svg";
import id from "../assets/icons/id-card.svg";
import face from "../assets/icons/scan-face.svg";
import Shield from "../assets/icons/shield-check.svg";
import final from "../assets/icons/file-user.svg";
import "./sidebar.css";

const Sidebar = ({ show, onClose }) => {


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
        {/* <span className="fw-bold">{user}</span> */}
      </div>

      <nav className="nav flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
          }
          end
        >
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
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
              Home
            </span>
          )}
        </NavLink>
        <NavLink
          to="/reservation-entry"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={Calendar}
                alt="Calendar"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Reservation Entry
            </span>
          )}
        </NavLink>
        <NavLink
          to="/guest-phone-entry"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={Phone}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Guest Phone Entry
            </span>
          )}
        </NavLink>
        <NavLink
          to="/aadhaar-verification"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={id}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Aadhaar Verification
            </span>
          )}
        </NavLink>
        <NavLink
          to="/face-capture"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={face}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Face Capture
            </span>
          )}
        </NavLink>
        <NavLink
          to="/verification-summary"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={Shield}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Verification Summary
            </span>
          )}
        </NavLink>
        <NavLink
          to="/final-summary"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={final}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Final Summary
            </span>
          )}
        </NavLink>
        {/* <NavLink
          to="/dependent-linking"
          className={({ isActive }) =>
            `nav-link sidebar-l1 ${isActive ? "active" : ""}`
          }>
          {({ isActive }) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={link}
                alt="Phone"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Dependent Linking
            </span>
          )}
        </NavLink> */}
      </nav>
    </div>
  );
};

export default Sidebar;
