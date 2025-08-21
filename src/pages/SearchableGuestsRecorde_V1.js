// import React, { useState } from "react";
// import { Button, Table, Modal } from "react-bootstrap";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "./SearchableGuestsRecorde.css";
// import { format } from "date-fns";
// import { HiOutlineDownload, HiOutlineRefresh } from "react-icons/hi";
// import DateHoursFilter from "../components/Filter/DateHoursFilter";
// import Aadhar from "../assets/images/aadhaar-1.svg";
// import IndianEmblem from "../assets/images/emblem-of-india-1.svg";

// const SearchableGuestsRecorde = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [records] = useState([
//     {
//       reservation: "RES1112",
//       name: "Carlos Mendoza",
//       hotel: "Sunrise Plaza",
//       location: "Connaught Place",
//       phone: "9876012398",
//       verification: "Passport",
//       faceMatch: "Match",
//       checkIn: "2025-08-18 06:10 PM",
//       staffName: "Preeti Chawla",
//       aadhaar: "XXXX XXXX 1112",
//     },
//     {
//       reservation: "RES9012",
//       name: "Arjun Patel",
//       hotel: "Sunset Resort",
//       location: "Marine Drive",
//       phone: "9876123419",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-18 03:15 PM",
//       staffName: "Mohammed Ali",
//       aadhaar: "XXXX XXXX 9012",
//     },
//     {
//       reservation: "RES3456",
//       name: "Maria Garcia",
//       hotel: "Greenwood Inn",
//       location: "Brigade Road",
//       phone: "9988776625",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-17 05:50 PM",
//       staffName: "Suman Verma",
//       aadhaar: "XXXX XXXX 3456",
//     },
//     {
//       reservation: "RES7890",
//       name: "Liam Brown",
//       hotel: "Ocean View Hotel",
//       location: "Juhu Beach",
//       phone: "9123456791",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-17 08:20 PM",
//       staffName: "Rajiv Mehta",
//       aadhaar: "XXXX XXXX 7890",
//     },
//     {
//       reservation: "RES4321",
//       name: "Sophia Lee",
//       hotel: "Elite Stay",
//       location: "Cyber Hub",
//       phone: "9765432198",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-18 07:05 AM",
//       staffName: "Priya Singh",
//       aadhaar: "XXXX XXXX 4321",
//     },
//     {
//       reservation: "RES6543",
//       name: "Omar Khan",
//       hotel: "Blue Lagoon",
//       location: "Bandra West",
//       phone: "9988123467",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-16 06:40 PM",
//       staffName: "Vikram Desai",
//       aadhaar: "XXXX XXXX 6543",
//     },
//     {
//       reservation: "RES8765",
//       name: "Emma Wilson",
//       hotel: "City Comforts",
//       location: "Indiranagar",
//       phone: "9876549823",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-18 12:10 PM",
//       staffName: "Kavita Rao",
//       aadhaar: "XXXX XXXX 8765",
//     },
//     {
//       reservation: "RES2468",
//       name: "Rajesh Sharma",
//       hotel: "The Heritage",
//       location: "Connaught Place",
//       phone: "9123987695",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-15 02:25 PM",
//       staffName: "Deepak Nair",
//       aadhaar: "XXXX XXXX 2468",
//     },
//     {
//       reservation: "RES1357",
//       name: "Olivia Martin",
//       hotel: "Palm Residency",
//       location: "Salt Lake",
//       phone: "9345678943",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-18 01:45 PM",
//       staffName: "Neha Kapoor",
//       aadhaar: "XXXX XXXX 1357",
//     },
//     {
//       reservation: "RES2021",
//       name: "Kabir Singh",
//       hotel: "Regal Suites",
//       location: "MG Road",
//       phone: "9876012374",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-16 09:30 AM",
//       staffName: "Alok Pandey",
//       aadhaar: "XXXX XXXX 2021",
//     },
//     {
//       reservation: "RES3031",
//       name: "Emily Davis",
//       hotel: "Silver Sands",
//       location: "Vashi",
//       phone: "9765021375",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-17 02:50 PM",
//       staffName: "Sneha Reddy",
//       aadhaar: "XXXX XXXX 3031",
//     },
//     {
//       reservation: "RES4444",
//       name: "David Johnson",
//       hotel: "Hilltop Villa",
//       location: "Shimla Mall Road",
//       phone: "9456123489",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-14 04:00 PM",
//       staffName: "Arvind Joshi",
//       aadhaar: "XXXX XXXX 4444",
//     },
//     {
//       reservation: "RES5555",
//       name: "Aisha Khan",
//       hotel: "Luxury Stay",
//       location: "Powai",
//       phone: "9123498762",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-18 10:15 AM",
//       staffName: "Reena Malhotra",
//       aadhaar: "XXXX XXXX 5555",
//     },
//     {
//       reservation: "RES6666",
//       name: "Daniel White",
//       hotel: "Royal Orchid",
//       location: "Koramangala",
//       phone: "9345678123",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-15 07:30 PM",
//       staffName: "Suresh Iyer",
//       aadhaar: "XXXX XXXX 6666",
//     },
//     {
//       reservation: "RES7777",
//       name: "Neha Gupta",
//       hotel: "Golden Pearl",
//       location: "Sector 18 Noida",
//       phone: "9876012388",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-16 11:45 AM",
//       staffName: "Anjali Bhatia",
//       aadhaar: "XXXX XXXX 7777",
//     },
//     {
//       reservation: "RES8888",
//       name: "Michael Chen",
//       hotel: "Lotus Inn",
//       location: "Chandni Chowk",
//       phone: "9812345678",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-13 06:20 PM",
//       staffName: "Gaurav Malhotra",
//       aadhaar: "XXXX XXXX 8888",
//     },
//     {
//       reservation: "RES9999",
//       name: "Sofia Rodriguez",
//       hotel: "Star Residency",
//       location: "Park Street",
//       phone: "9876504321",
//       verification: "Passport",
//       faceMatch: "Match",
//       checkIn: "2025-08-17 09:05 PM",
//       staffName: "Manish Sinha",
//       aadhaar: "XXXX XXXX 9999",
//     },
//     {
//       reservation: "RES1212",
//       name: "Harsh Verma",
//       hotel: "Emerald Towers",
//       location: "Civil Lines",
//       phone: "9765012398",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-14 03:35 PM",
//       staffName: "Chitra Das",
//       aadhaar: "XXXX XXXX 1212",
//     },
//     {
//       reservation: "RES1313",
//       name: "Grace Taylor",
//       hotel: "The Oberon",
//       location: "Golf Course Road",
//       phone: "9321654789",
//       verification: "Manual",
//       faceMatch: "Mismatch",
//       checkIn: "2025-08-18 05:00 PM",
//       staffName: "Harpreet Kaur",
//       aadhaar: "XXXX XXXX 1313",
//     },
//     {
//       reservation: "RES1414",
//       name: "Rohan Malhotra",
//       hotel: "Serene Heights",
//       location: "Powai Lake",
//       phone: "9812098765",
//       verification: "Aadhaar",
//       faceMatch: "Match",
//       checkIn: "2025-08-15 08:25 AM",
//       staffName: "Satish Menon",
//       aadhaar: "XXXX XXXX 1414",
//     },
//   ]);

//   const getMaskedAadhaar = (guest) => {
//     const last4 = guest.phone.slice(-4);
//     return `XXXX XXXX ${last4}`;
//   };

//   const [activeFilter, setActiveFilter] = useState("Checked-in");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedGuest, setSelectedGuest] = useState(null);

//   // Export CSV
//   const exportCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(records);
//     const workbook = XLSX.utils.book_new();
//     worksheet["!protect"] = {
//       password: "readonly",
//       selectLockedCells: true,
//       formatCells: false,
//       insertRows: false,
//       deleteRows: false,
//       insertCols: false,
//       deleteCols: false,
//     };
//     XLSX.utils.book_append_sheet(workbook, worksheet, "VerifiedGuests");
//     XLSX.writeFile(workbook, "verified_guest_records.xlsx");
//   };

//   // Export PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Verified Guest Check-In Records", 14, 16);
//     autoTable(doc, {
//       startY: 22,
//       head: [
//         [
//           "Hotel",
//           "Reservation Number",
//           "Guest Name",
//           "Phone Number",
//           "Verification Status",
//           "Face Match Result",
//           "Check-In Timestamp",
//           "Staff Name",
//         ],
//       ],
//       body: records.map((r) => [
//         r.hotel,
//         r.reservation,
//         r.name,
//         r.phone,
//         r.verification,
//         r.faceMatch,
//         r.checkIn,
//         r.staffName,
//       ]),
//     });
//     doc.save("verified_guest_records.pdf");
//   };

//   const filteredRecords = records.filter((r) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       r.name.toLowerCase().includes(term) ||
//       r.phone.toLowerCase().includes(term) ||
//       r.reservation.toLowerCase().includes(term) ||
//       r.verification.toLowerCase().includes(term) ||
//       r.hotel.toLowerCase().includes(term)
//     );
//   });

//   const handleShowDetails = (guest) => {
//     setSelectedGuest(guest);
//     setShowModal(true);
//   };

//   return (
//     <div className="container-fluid p-4">
//       {/* Header */}
//       <h4 className="mb-1">Search Guests Records</h4>
//       <p className="text-muted mb-3">
//         Search guest information for law enforcement access.
//       </p>
//       {/* Status filter buttons */}
//       <div className="d-flex w-100 mb-3 status-btn-group">
//         {[
//           "Checked In",
//           "Upcoming Reservation",
//           "Walk-in Guest",
//           "Extended Stay",
//           "Checked Out",
//         ].map((status) => (
//           <button
//             key={status}
//             className={`status-btn flex-fill ${
//               activeFilter === status ? "active" : ""
//             }`}
//             onClick={() => setActiveFilter(status)}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Action filters + buttons */}
//       <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
//         {/* Left side: Filter + Search */}
//         <input
//           type="text"
//           className="form-control custom-search-input"
//           placeholder="Search by name, phone, reservation, or Aadhaar"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <div className="d-flex gap-2 ms-auto">
//           <DateHoursFilter />
//         </div>

//         {/* Right side: Buttons */}
//         <div className="d-flex gap-2">
//           <button className="pill-btn" onClick={exportCSV}>
//             <HiOutlineDownload size={18} /> Export Excel
//           </button>
//           <button className="pill-btn" onClick={exportPDF}>
//             <HiOutlineDownload size={18} /> Export PDF
//           </button>
//           <button className="pill-btn" onClick={() => window.location.reload()}>
//             <HiOutlineRefresh size={18} /> Refresh
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive custom-table-wrapper">
//         <Table hover className="guest-table">
//           <thead>
//             <tr>
//               <th>Hotel</th>
//               <th>Reservation Number</th>
//               <th>Guest Name</th>
//               <th>Phone Number</th>
//               <th>Verification Status</th>
//               <th>Face Match Result</th>
//               <th>Check-In Timestamp</th>
//               <th>Staff Name</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRecords.map((r, i) => (
//               <tr key={i}>
//                 <td>{r.hotel}</td>
//                 <td>{r.reservation}</td>
//                 <td>{r.name}</td>
//                 <td>{r.phone}</td>
//                 <td className="status-cell">{r.verification}</td>
//                 <td className="status-cell">{r.faceMatch}</td>
//                 <td>{format(new Date(r.checkIn), "MMM d, h:mm a")}</td>
//                 <td>{r.staffName}</td>
//                 <td>
//                   <button
//                     size="sm"
//                     style={{
//                       border: "1px solid #ccc",
//                       borderRadius: "4px",
//                       background: "transparent",
//                     }}
//                     onClick={() => handleShowDetails(r)}
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {records.length === 0 && (
//               <tr>
//                 <td colSpan="8" className="text-center text-muted">
//                   No verified guest records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="md"
//       >
//         <Modal.Body className="p-0">
//           {selectedGuest && (
//             <div className="aadhaar-card">
//               {/* Header */}
//               <div className="aadhaar-header">
//                 <img
//                   src={IndianEmblem}
//                   alt="Aadhaar Logo"
//                   className="IndianEmblem-logo"
//                 />
//                 <img src={Aadhar} alt="Aadhaar Logo" className="aadhaar-logo" />
//               </div>

//               {/* Body */}
//               <div className="aadhaar-body">
//                 <div className="photo-box">
//                   <img src={Aadhar} alt="Guest" />
//                 </div>
//                 <div className="details">
//                   <h6>
//                     <strong>{selectedGuest.name}</strong>
//                   </h6>
//                   <p>DOB: {selectedGuest.checkIn.split(" ")[0]}</p>
//                   <p>Gender: Male</p>
//                   <p>Hotel: {selectedGuest.hotel}</p>
//                   <p>Phone: {selectedGuest.phone}</p>
//                   <p>Staff: {selectedGuest.staffName}</p>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="aadhaar-footer">
//                 <h5>{getMaskedAadhaar(selectedGuest)}</h5>
//               </div>
//             </div>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default SearchableGuestsRecorde;
