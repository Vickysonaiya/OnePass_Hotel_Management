// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import onepasslogo from "../assets/images/1pass_logo.jpg";
// import home from "../assets/icons/home.svg";
// import guestsIcon from "../assets/images/users.svg";
// import reservationIcon from "../assets/images/calendar.svg";
// import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // add this import
// import "./sidebar.css";

// const Sidebar = ({ show, onClose }) => {
//   const [openGuestRecords, setOpenGuestRecords] = useState(false);
//   const [openReservations, setOpenReservations] = useState(false);

//   return (
//     <div
//       className={`sidebar bg-white border-end p-3 position-fixed top-0 start-0 ${
//         show ? "d-block" : "d-none d-md-block"
//       }`}
//       style={{
//         width: "265px",
//         height: "100vh",
//         zIndex: 1050,
//         overflowY: "auto",
//       }}
//     >
//       <button
//         className="btn btn-sm btn-outline-secondary d-md-none mb-3"
//         onClick={onClose}
//       >
//         ✕
//       </button>

//       <div className="d-flex align-items-center mb-2">
//         <img
//           src={onepasslogo}
//           alt="avatar"
//           className="me-2 logo"
//           width={46}
//           height={46}
//         />
//       </div>

//       <nav className="nav flex-column">
//         {/* Home */}
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
//           }
//           end
//         >
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={home}
//                 alt="Home"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Home
//             </span>
//           )}
//         </NavLink>
//         {/* Guest Records */}
//         {/* <div className="mt-2">
//           <NavLink
//             to="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setOpenGuestRecords(!openGuestRecords);
//             }}
//             className={({ isActive }) =>
//               `nav-link sidebar-l1 d-flex justify-content-between align-items-center ${
//                 openGuestRecords ? "active" : ""
//               }`
//             }
//           >

//             <span className="d-flex align-items-center">
//               <img
//                 src={guestsIcon}
//                 alt="Guests"
//                 style={{ width: 16, height: 16, marginRight: 8 }}
//               />
//               Guest Records
//             </span>

//             <span className="d-flex align-items-center">
//               {openGuestRecords ? (
//                 <HiChevronUp size={20} />
//               ) : (
//                 <HiChevronDown size={20} />
//               )}
//             </span>
//           </NavLink>

//           {openGuestRecords && (
//             <div className="GuestsSubRecords nav flex-column">
//               <NavLink to="AllGuestRecords" className="nav-link sidebar-l2">
//                 Guest Records
//               </NavLink>
//               <NavLink
//                 to="VerificationFailures"
//                 className="nav-link sidebar-l2"
//               >
//                 Verification Failures
//               </NavLink>
//               <NavLink to="DependentRecords" className="nav-link sidebar-l2">
//                 Dependent Records
//               </NavLink>
//             </div>
//           )}
//         </div> */}

//         {/* Guest Records */}
//         <div className="mt-2">
//           <button
//             type="button"
//             onClick={() => setOpenGuestRecords(!openGuestRecords)}
//             className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center ${
//               openGuestRecords ? "open" : ""
//             }`}
//           >
//             {/* Left: icon + label */}
//             <span className="d-flex align-items-center">
//               <img
//                 src={guestsIcon}
//                 alt="Guests"
//                 style={{ width: 16, height: 16, marginRight: 8 }}
//               />
//               Guest Records
//             </span>

//             {/* Right: arrow */}
//             <span className="d-flex align-items-center">
//               {openGuestRecords ? (
//                 <HiChevronUp size={20} />
//               ) : (
//                 <HiChevronDown size={20} />
//               )}
//             </span>
//           </button>

//           {openGuestRecords && (
//             <div className="GuestsSubRecords nav flex-column">
//               <NavLink to="AllGuestRecords" className="nav-link sidebar-l2">
//                 Guest Records
//               </NavLink>
//               <NavLink
//                 to="VerificationFailures"
//                 className="nav-link sidebar-l2"
//               >
//                 Verification Failures
//               </NavLink>
//               <NavLink to="DependentRecords" className="nav-link sidebar-l2">
//                 Dependent Records
//               </NavLink>
//             </div>
//           )}
//         </div>

//         {/* Reservation Details */}
//         <div className="mt-2">
//           <NavLink
//             to="#"
//             onClick={(e) => {
//               e.preventDefault();
//               setOpenReservations(!openReservations);
//             }}
//             className={({ isActive }) =>
//               `nav-link sidebar-l1 d-flex justify-content-between align-items-center ${
//                 openReservations ? "active" : ""
//               }`
//             }
//           >
//             {/* Left: icon + label */}
//             <span className="d-flex align-items-center">
//               <img
//                 src={reservationIcon}
//                 alt="Reservation"
//                 style={{ width: 16, height: 16, marginRight: 8 }}
//               />
//               Reservation Details
//             </span>

//             {/* Right: arrow */}
//             <span className="d-flex align-items-center">
//               {openReservations ? (
//                 <HiChevronUp size={20} />
//               ) : (
//                 <HiChevronDown size={20} />
//               )}
//             </span>
//           </NavLink>

//           {openReservations && (
//             <div className="GuestsSubRecords nav flex-column">
//               <NavLink
//                 to="/reservations/by-number"
//                 className="nav-link sidebar-l2"
//               >
//                 By Reservation Number
//               </NavLink>
//               <NavLink
//                 to="/reservations/by-hotel"
//                 className="nav-link sidebar-l2"
//               >
//                 By Property
//               </NavLink>
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// --

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
import guestsIcon from "../assets/images/users.svg";
import reservationIcon from "../assets/images/calendar.svg";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import "./sidebar.css";

const Sidebar = ({ show, onClose }) => {
  const [openGuestRecords, setOpenGuestRecords] = useState(false);
  const [openReservations, setOpenReservations] = useState(false);
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
            onClick={() => setOpenGuestRecords(!openGuestRecords)}
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center ${
              openGuestRecords && !isGuestSubActive ? "active" : ""
            }`}
            style={{ width: "100%" }} // ensure button takes full width
          >
            {/* Left: icon + label */}
            <span className="d-flex align-items-center">
              <img
                src={guestsIcon}
                alt="Guests"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Guest Records
            </span>

            {/* Right: chevron pushed to the end */}
            <span className="ms-auto d-flex align-items-center">
              {openGuestRecords ? (
                <HiChevronUp size={20} />
              ) : (
                <HiChevronDown size={20} />
              )}
            </span>
          </button>

          {openGuestRecords && (
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
            onClick={() => setOpenReservations(!openReservations)}
            className={`nav-link d-flex justify-content-between align-items-center sidebar-l1 ${
              openReservations && !isReservationSubActive ? "active" : ""
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
              {openReservations ? (
                <HiChevronUp size={20} />
              ) : (
                <HiChevronDown size={20} />
              )}
            </span>
          </button>

          {openReservations && (
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
