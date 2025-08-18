import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import videointelligence from "../assets/icons/videointelligence.svg";
import visitormanagement from "../assets/icons/visitormanagement.svg";
import accesscontrol from "../assets/icons/accesscontrol.svg";
import home from "../assets/icons/home.svg";
import guardandpatrol from "../assets/icons/guardandpatrol.svg";
import locationdesk from "../assets/icons/locationsdesk.svg";
import incidentalert from "../assets/icons/incidentalert.svg";
import "./sidebar.css";

const Sidebar = ({ show, onClose }) => {
  // const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
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
        {/* <span className="fw-bold">{user}</span> */}
      </div>

      <nav className="nav flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
          }
          end
          onClick={() => setOpenDropdown(null)}
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

        <span className="d-flex ms-2 mt">Access</span>

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={visitormanagement}
                alt="Visitor Management"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Visitor Management
            </span>
          ),
          "visitor",
          [
            {
              to: "/visitormanagement/visits",
              label: "Visits",
            },
            // {
            //   to: "/visitormanagement/walk-invisitors",
            //   label: "Walk-in Visitors",
            // },
            // {
            //   to: "/visitormanagement/unchecked-Outvisitors",
            //   label: "Unchecked-Out Visitors",
            // },
            // {
            //   to: "/visitormanagement/overstaybreach",
            //   label: "Overstay Breach",
            // },
            { to: "/visitormanagement/deniedaccess", label: "Denied Access" },
            {
              to: "/visitormanagement/blacklistedwalk-in",
              label: "Blacklisted Walk-in",
            },
            {
              to: "/visitormanagement/rejectedIDproof",
              label: "Rejected ID Proof",
            },
            {
              to: "/visitormanagement/hostSLAbreach",
              label: "Host SLA Breach",
            },
            {
              to: "/visitormanagement/frequentvisitorwatchlist",
              label: "Frequent Visitor Watchlist",
            },
          ]
        )}

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={accesscontrol}
                alt="Access Control"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Access Control
            </span>
          ),
          "access",
          [
            { to: "/accesscontrol/liveaccesslogs", label: "Live Access Logs" },
            {
              to: "/accesscontrol/blockedentryattempts",
              label: "Blocked Entry Attempts",
            },
            {
              to: "/accesscontrol/accesspointsstatus",
              label: "Access Points Status",
            },
            {
              to: "/accesscontrol/overstayviolationtracker",
              label: "Overstay Violation Tracker",
            },
            {
              to: "/accesscontrol/vehicleentrylogs",
              label: "Vehicle Entry Logs",
            },
          ]
        )}

        <span className="d-flex ms-2 mt">Security</span>

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={videointelligence}
                alt="Video Intelligence"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Video Intelligence
            </span>
          ),
          "video",
          [
            {
              to: "/videointelligence/livecamerawall",
              label: "Live Camera Wall",
            },
            {
              to: "/videointelligence/anomalydetectionalerts",
              label: "Anomaly Detection Alerts",
            },
            {
              to: "/videointelligence/unrecognizedfacelog",
              label: "Unrecognized Face Log",
            },
            {
              to: "/videointelligence/visitorfacematchfailures",
              label: "Visitor Face Match Failures",
            },
          ]
        )}

        

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={guardandpatrol}
                alt="Guards and Patrols"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Guards and Patrols
            </span>
          ),
          "guards",
          [
            {
              to: "/guardsandpatrols/guarddutyroster",
              label: "Guard Duty Roster",
            },
            {
              to: "/guardsandpatrols/liveguardstatusmap",
              label: "Live Guard Status Map",
            },
            {
              to: "/guardsandpatrols/patrolscheduleplanner",
              label: "Patrol Schedule Planner",
            },
            {
              to: "/guardsandpatrols/missedordelayedpatrols",
              label: "Missed/Delayed Patrols",
            },
            {
              to: "/guardsandpatrols/guard-Initiatedescalations",
              label: "Guard-Initiated Escalations",
            },
            {
              to: "/guardsandpatrols/guarddevicehealthmonitor",
              label: "Guard Device Health Monitor",
            },
          ]
        )}

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={locationdesk}
                alt="Locations and Desks"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Locations and Desks
            </span>
          ),
          "location",
          [
            {
              to: "/locationsanddesks/locationsetup",
              label: "Location Setup",
            },
            {
              to: "/locationsanddesks/deskassignment&status",
              label: "Desk Assignment & Status",
            },
            {
              to: "/locationsanddesks/visitorloadbalancingbydesk",
              label: "Visitor Load Balancing",
            },
            {
              to: "/locationsanddesks/unit-levelaccesscontrolprofiles",
              label: "Unit Access Profiles",
            },
            {
              to: "/locationsanddesks/location-wisevisitorriskprofile",
              label: "Visitor Risk Profile",
            },
          ]
        )}

        {renderDropdown(
          (isActive) => (
            <span className="d-flex align-items-center gap-1">
              <img
                src={incidentalert}
                alt="Incidents and Alerts"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Incidents and Alerts
            </span>
          ),
          "incident",
          [
            {
              to: "/incidentsandalerts/livealertsdashboard",
              label: "Live Alerts Dashboard",
            },
            {
              to: "/incidentsandalerts/alerttypesbysource",
              label: "Alert Types by Source",
            },
            {
              to: "/incidentsandalerts/overstayviolationalerts",
              label: "Overstay Alerts",
            },
            {
              to: "/incidentsandalerts/visitorescalationlog",
              label: "Escalation Log",
            },
            {
              to: "/incidentsandalerts/responseSLA&closuretimes",
              label: "Response SLA & Times",
            },
            {
              to: "/incidentsandalerts/falsealertfeedbackloop",
              label: "False Alert Feedback",
            },
          ]
        )}

        {/* <NavLink to="/FilterComponent" className="nav-link" end>
          Filter
        </NavLink> */}
      </nav>
    </div>
  );

  function renderDropdown(titleOrFn, key, links) {
    const isOpen = openDropdown === key;
    // Determine if titleOrFn is a function (for icon color logic)
    const isActive = isOpen;
    const title =
      typeof titleOrFn === "function" ? titleOrFn(isActive) : titleOrFn;
    return (
      <div>
        <button
          className="nav-link btn btn-link w-100 d-flex justify-content-between align-items-center sidebar-l1"
          onClick={() => handleDropdownToggle(key)}
          aria-expanded={isOpen}
        >
          {title}
          {isOpen ? (
            <BsChevronUp style={{ color: "#007bff" }} />
          ) : (
            <BsChevronDown />
          )}
        </button>
        {isOpen && (
          <div className="ms-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link sidebar-l2 navItem ${isActive ? "active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Sidebar;
