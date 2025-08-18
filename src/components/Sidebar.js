import React from "react";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
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
      </nav>
    </div>
  );
};

export default Sidebar;
