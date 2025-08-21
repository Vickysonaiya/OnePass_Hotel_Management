import React, { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./DailyGuestLog.css"; // you can reuse the same css
import { format } from "date-fns";
import { HiOutlineDownload, HiOutlineRefresh } from "react-icons/hi";
import DateHoursFilter from "../components/Filter/DateHoursFilter";
import Aadhar from "../assets/images/aadhaar-1.svg";
import IndianEmblem from "../assets/images/emblem-of-india-1.svg";

const DailyGuestLog = () => {
  const [records] = useState([
    {
      reservation: "RES4832",
      name: "Rahul Gupta",
      hotel: "Hotel Sunrise",
      location: "Connaught Place",
      phone: "9876543210",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 08:30 AM",
      staffName: "Anita Sharma",
      aadhaar: "XXXX XXXX 1234",
    },
    {
      reservation: "RES9281",
      name: "Emily Johnson",
      hotel: "Hotel Paradise",
      location: "MG Road",
      phone: "9876501234",
      verification: "Passport",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 09:15 AM",
      staffName: "Rajesh Mehta",
      aadhaar: "XXXX XXXX 5678",
    },
    {
      reservation: "RES1745",
      name: "Arjun Verma",
      hotel: "Grand Palace",
      location: "Brigade Road",
      phone: "9765432109",
      verification: "Manual",
      faceMatch: "Match",
      checkIn: "2025-08-19 10:05 AM",
      staffName: "Priya Nair",
      aadhaar: "XXXX XXXX 9012",
    },
    {
      reservation: "RES6529",
      name: "Sophia Lee",
      hotel: "Ocean View Hotel",
      location: "Juhu Beach",
      phone: "9988776655",
      verification: "Aadhaar",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 10:40 AM",
      staffName: "Mohammed Ali",
      aadhaar: "XXXX XXXX 3456",
    },
    {
      reservation: "RES3412",
      name: "Kabir Malhotra",
      hotel: "Sunset Resort",
      location: "Marine Drive",
      phone: "9123456789",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 11:25 AM",
      staffName: "Suman Verma",
      aadhaar: "XXXX XXXX 7890",
    },
    {
      reservation: "RES7590",
      name: "Olivia Brown",
      hotel: "City Comforts",
      location: "Indiranagar",
      phone: "9345678901",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 11:55 AM",
      staffName: "Ravi Kumar",
      aadhaar: "XXXX XXXX 4321",
    },
    {
      reservation: "RES2048",
      name: "Rohan Singh",
      hotel: "Elite Stay",
      location: "Cyber Hub",
      phone: "9876123456",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 12:20 PM",
      staffName: "Kavita Rao",
      aadhaar: "XXXX XXXX 6543",
    },
    {
      reservation: "RES8853",
      name: "Emma Wilson",
      hotel: "Blue Lagoon",
      location: "Bandra West",
      phone: "9123987654",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 12:50 PM",
      staffName: "Deepak Nair",
      aadhaar: "XXXX XXXX 8765",
    },
    {
      reservation: "RES3917",
      name: "Aarav Kapoor",
      hotel: "Palm Residency",
      location: "Salt Lake",
      phone: "9765021345",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 01:20 PM",
      staffName: "Neha Kapoor",
      aadhaar: "XXXX XXXX 2468",
    },
    {
      reservation: "RES7642",
      name: "Grace Wong",
      hotel: "The Heritage",
      location: "Connaught Place",
      phone: "9876012398",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 01:45 PM",
      staffName: "Vikram Desai",
      aadhaar: "XXXX XXXX 1357",
    },
    {
      reservation: "RES1198",
      name: "Daniel Kim",
      hotel: "Lotus Residency",
      location: "Koregaon Park",
      phone: "9988123456",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 02:10 PM",
      staffName: "Sneha Reddy",
      aadhaar: "XXXX XXXX 2021",
    },
    {
      reservation: "RES5423",
      name: "Isha Sharma",
      hotel: "Skyline Hotel",
      location: "Gachibowli",
      phone: "9345671234",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 02:35 PM",
      staffName: "Kiran Joshi",
      aadhaar: "XXXX XXXX 3031",
    },
    {
      reservation: "RES2876",
      name: "Michael Scott",
      hotel: "Pearl Heights",
      location: "Powai",
      phone: "9876543201",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 03:05 PM",
      staffName: "Arjun Malhotra",
      aadhaar: "XXXX XXXX 4041",
    },
    {
      reservation: "RES4310",
      name: "Ananya Iyer",
      hotel: "Royal Crown",
      location: "Whitefield",
      phone: "9988776611",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 03:25 PM",
      staffName: "Rohit Gupta",
      aadhaar: "XXXX XXXX 5051",
    },
    {
      reservation: "RES6741",
      name: "Carlos Mendoza",
      hotel: "Green Park",
      location: "Karol Bagh",
      phone: "9345678912",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 03:55 PM",
      staffName: "Shalini Yadav",
      aadhaar: "XXXX XXXX 6061",
    },
    {
      reservation: "RES9835",
      name: "Neha Patel",
      hotel: "Sea Breeze",
      location: "Juhu Beach",
      phone: "9765432189",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 04:15 PM",
      staffName: "Naveen Kulkarni",
      aadhaar: "XXXX XXXX 7071",
    },
    {
      reservation: "RES3204",
      name: "David Miller",
      hotel: "Sunrise Plaza",
      location: "Park Street",
      phone: "9876012345",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 04:45 PM",
      staffName: "Meena Iyer",
      aadhaar: "XXXX XXXX 8081",
    },
    {
      reservation: "RES5532",
      name: "Sneha Rathi",
      hotel: "Silver Sands",
      location: "Vashi",
      phone: "9345678909",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-19 05:10 PM",
      staffName: "Ashok Menon",
      aadhaar: "XXXX XXXX 9091",
    },
    {
      reservation: "RES7689",
      name: "Kabir Khan",
      hotel: "Regal Suites",
      location: "MG Road",
      phone: "9123456780",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-19 05:30 PM",
      staffName: "Preeti Chawla",
      aadhaar: "XXXX XXXX 1011",
    },
    {
      reservation: "RES8450",
      name: "Hannah Davis",
      hotel: "The Oberoi",
      location: "Nariman Point",
      phone: "9876098765",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 06:00 PM",
      staffName: "Alok Pandey",
      aadhaar: "XXXX XXXX 1112",
    },
  ]);

  const getMaskedAadhaar = (guest) => {
    const last4 = guest.phone.slice(-4);
    return `XXXX XXXX ${last4}`;
  };

  const [activeFilter, setActiveFilter] = useState("Checked-in");
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Export CSV
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    worksheet["!protect"] = {
      password: "readonly",
      selectLockedCells: true,
      formatCells: false,
      insertRows: false,
      deleteRows: false,
      insertCols: false,
      deleteCols: false,
    };
    XLSX.utils.book_append_sheet(workbook, worksheet, "DailyGuestLog");
    XLSX.writeFile(workbook, "daily_guest_log.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Daily Guest Log", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [
        [
          "Hotel",
          "Reservation Number",
          "Guest Name",
          "Phone Number",
          "Verification Status",
          "Face Match Result",
          "Check-In Timestamp",
          "Staff Name",
        ],
      ],
      body: records.map((r) => [
        r.hotel,
        r.reservation,
        r.name,
        r.phone,
        r.verification,
        r.faceMatch,
        r.checkIn,
        r.staffName,
      ]),
    });
    doc.save("daily_guest_log.pdf");
  };

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <h4 className="mb-1">Daily Guest Log</h4>
      <p className="text-muted mb-3">
        Guest check-in and verification log for today.
      </p>

      {/* Status filter buttons */}
      <div className="d-flex w-100 mb-3 status-btn-group">
        {[
          "Checked In",
          "Upcoming Reservation",
          "Walk-in Guest",
          "Extended Stay",
          "Checked Out",
        ].map((status) => (
          <button
            key={status}
            className={`status-btn flex-fill ${
              activeFilter === status ? "active" : ""
            }`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Action filters + buttons */}
      <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
        {/* Left side: Date & Hours Filter */}
        <div className="ms-auto">
          <DateHoursFilter />
        </div>

        {/* Right side: Export + Refresh */}
        <div className="d-flex gap-2">
          <button className="pill-btn" onClick={exportCSV}>
            <HiOutlineDownload size={18} /> Export Excel
          </button>
          <button className="pill-btn" onClick={exportPDF}>
            <HiOutlineDownload size={18} /> Export PDF
          </button>
          <button className="pill-btn" onClick={() => window.location.reload()}>
            <HiOutlineRefresh size={18} /> Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive custom-table-wrapper">
        <Table hover className="guest-table">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Reservation Number</th>
              <th>Guest Name</th>
              <th>Phone Number</th>
              <th>Verification Status</th>
              <th>Face Match Result</th>
              <th>Check-In Timestamp</th>
              <th>Staff Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.hotel}</td>
                <td>{r.reservation}</td>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.verification}</td>
                <td>{r.faceMatch}</td>
                <td>{format(new Date(r.checkIn), "MMM d, h:mm a")}</td>
                <td>{r.staffName}</td>
                <td>
                  <button
                    size="sm"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                    }}
                    onClick={() => handleShowDetails(r)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No guest log records found for today
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Body className="p-0">
          {selectedGuest && (
            <div className="aadhaar-card">
              {/* Header */}
              <div className="aadhaar-header">
                <img
                  src={IndianEmblem}
                  alt="Aadhaar Logo"
                  className="IndianEmblem-logo"
                />
                <img src={Aadhar} alt="Aadhaar Logo" className="aadhaar-logo" />
              </div>

              {/* Body */}
              <div className="aadhaar-body">
                <div className="photo-box">
                  <img src={Aadhar} alt="Guest" />
                </div>
                <div className="details">
                  <h6>
                    <strong>{selectedGuest.name}</strong>
                  </h6>
                  <p>DOB: {selectedGuest.checkIn.split(" ")[0]}</p>
                  <p>Gender: Male</p>
                  <p>Hotel: {selectedGuest.hotel}</p>
                  <p>Phone: {selectedGuest.phone}</p>
                  <p>Staff: {selectedGuest.staffName}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="aadhaar-footer">
                <h5>{getMaskedAadhaar(selectedGuest)}</h5>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DailyGuestLog;
