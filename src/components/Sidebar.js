import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
import guestsIcon from "../assets/images/users.svg";
import reservationIcon from "../assets/images/calendar.svg";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import "./sidebar.css";

const Sidebar = ({ show, onClose }) => {
  const [openMenu, setOpenMenu] = useState(null); // track which menu is open
  const location = useLocation();

  // Guest sub routes
  const guestSubRoutes = [
    "/AllGuestRecords",
    "/VerificationFailures",
    "/DependentRecords",
  ];
  const isGuestSubActive = guestSubRoutes.some((path) =>
    location.pathname.includes(path)
  );

  // Reservation sub routes
  const reservationSubRoutes = [
    "/reservations/by-number",
    "/reservations/by-hotel",
  ];
  const isReservationSubActive = reservationSubRoutes.some((path) =>
    location.pathname.includes(path)
  );

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
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
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
          }
          end
          onClick={() => setOpenMenu(null)}
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

        {/* Guest Records */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => toggleMenu("guests")}
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center ${
              openMenu === "guests" || isGuestSubActive ? "active" : ""
            }`}
            style={{ width: "100%" }}
          >
            <span className="d-flex align-items-center">
              <img
                src={guestsIcon}
                alt="Guests"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Guest Records
            </span>
            <span className="ms-auto d-flex align-items-center">
              {openMenu === "guests" ? (
                <HiChevronUp size={20} />
              ) : (
                <HiChevronDown size={20} />
              )}
            </span>
          </button>

          {openMenu === "guests" && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink to="/AllGuestRecords" className="nav-link sidebar-l2">
                Guest Records
              </NavLink>
              <NavLink
                to="/VerificationFailures"
                className="nav-link sidebar-l2"
              >
                Verification Failures
              </NavLink>
              <NavLink to="/DependentRecords" className="nav-link sidebar-l2">
                Dependent Records
              </NavLink>
            </div>
          )}
        </div>

        {/* Reservation Details */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => toggleMenu("reservations")}
            className={`nav-link d-flex justify-content-between align-items-center sidebar-l1 ${
              openMenu === "reservations" || isReservationSubActive
                ? "active"
                : ""
            }`}
            style={{ width: "100%" }}
          >
            <span className="d-flex align-items-center">
              <img
                src={reservationIcon}
                alt="Reservation"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Reservation Details
            </span>
            <span className="ms-auto d-flex align-items-center">
              {openMenu === "reservations" ? (
                <HiChevronUp size={20} />
              ) : (
                <HiChevronDown size={20} />
              )}
            </span>
          </button>

          {openMenu === "reservations" && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/reservations/by-number"
                className="nav-link sidebar-l2"
              >
                By Reservation Number
              </NavLink>
              <NavLink
                to="/reservations/by-hotel"
                className="nav-link sidebar-l2"
              >
                By Property
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
