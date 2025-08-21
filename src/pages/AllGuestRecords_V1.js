import React, { useState } from "react";
import { Table, Modal } from "react-bootstrap";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Aadhar from "../assets/images/aadhaar-1.svg";
import IndianEmblem from "../assets/images/emblem-of-india-1.svg";
import "./AllGuestRecords.css";
import { HiOutlineDownload, HiOutlineRefresh } from "react-icons/hi";
import DateHoursFilter from "../components/Filter/DateHoursFilter";

const AllGuestRecords = () => {
  const [records] = useState([
    {
      reservation: "RES9012",
      name: "Arjun Patel",
      hotel: "Sunset Resort",
      location: "Marine Drive",
      phone: "9876123419",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-18 03:15 PM",
      staffName: "Mohammed Ali",
    },
    {
      reservation: "RES3456",
      name: "Maria Garcia",
      hotel: "Greenwood Inn",
      location: "Brigade Road",
      phone: "9988776625",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-17 05:50 PM",
      staffName: "Suman Verma",
    },
    {
      reservation: "RES7890",
      name: "Liam Brown",
      hotel: "Ocean View Hotel",
      location: "Juhu Beach",
      phone: "9123456791",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-17 08:20 PM",
      staffName: "Rajiv Mehta",
    },
    {
      reservation: "RES4321",
      name: "Sophia Lee",
      hotel: "Elite Stay",
      location: "Cyber Hub",
      phone: "9765432198",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-18 07:05 AM",
      staffName: "Priya Singh",
    },
    {
      reservation: "RES6543",
      name: "Omar Khan",
      hotel: "Blue Lagoon",
      location: "Bandra West",
      phone: "9988123467",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-16 06:40 PM",
      staffName: "Vikram Desai",
    },
    {
      reservation: "RES8765",
      name: "Emma Wilson",
      hotel: "City Comforts",
      location: "Indiranagar",
      phone: "9876549823",
      verification: "Manual",
      faceMatch: "Mismatch",
      checkIn: "2025-08-18 12:10 PM",
      staffName: "Kavita Rao",
    },
    {
      reservation: "RES2468",
      name: "Rajesh Sharma",
      hotel: "The Heritage",
      location: "Connaught Place",
      phone: "9123987695",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-15 02:25 PM",
      staffName: "Deepak Nair",
    },
    {
      reservation: "RES1357",
      name: "Olivia Martin",
      hotel: "Palm Residency",
      location: "Salt Lake",
      phone: "9345678943",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-18 01:45 PM",
      staffName: "Neha Kapoor",
    },
    {
      reservation: "RES2021",
      name: "Kabir Singh",
      hotel: "Regal Suites",
      location: "MG Road",
      phone: "9876012374",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-16 09:30 AM",
      staffName: "Alok Pandey",
    },
    {
      reservation: "RES3031",
      name: "Emily Davis",
      hotel: "Silver Sands",
      location: "Vashi",
      phone: "9765021375",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-17 02:50 PM",
      staffName: "Sneha Reddy",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("Checked-in");
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  // Export CSV
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VerifiedGuests");
    XLSX.writeFile(workbook, "verified_guest_records.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Verified Guest Check-In Records", 14, 16);
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
    doc.save("verified_guest_records.pdf");
  };

  // Mask phone number like +91-98XXX-XXX41
  const maskPhone = (phone) => {
    if (!phone) return "";
    return `+91-${phone.substring(0, 2)}XXX-XXX${phone.slice(-2)}`;
  };

  // Mask Aadhaar (for modal footer)
  const getMaskedAadhaar = (guest) => {
    const last4 = guest.phone.slice(-4);
    return `XXXX XXXX ${last4}`;
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-1">All Guest Records</h4>
      <p className="text-muted mb-3">
        Verified guest information for law enforcement access.
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
        <div className="ms-auto">
          <DateHoursFilter />
        </div>
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
        <Table hover className="guest-table align-middle">
          <thead>
            <tr>
              <th>Check-in Date</th>
              <th>Property</th>
              <th>Guest Name</th>
              <th>Phone</th>
              <th>Verification</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                {/* 1. Check-in date */}
                <td>{format(new Date(r.checkIn), "d MMM yy, h:mm a")}</td>

                {/* 2. Property */}
                <td>
                  <div className="fw-semibold">{r.hotel}</div>
                  <small className="text-muted">{r.location}</small>
                </td>

                {/* 3. Guest Name */}
                <td>{r.name}</td>

                {/* 4. Phone (masked) */}
                <td>{maskPhone(r.phone)}</td>

                {/* 5. Verification status with traffic light */}
                <td>
                  {r.verification === "Aadhaar" && r.faceMatch === "Match" ? (
                    <span className="d-flex align-items-center gap-1">
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "green",
                        }}
                      ></span>
                      Aadhaar + Face ID
                    </span>
                  ) : (
                    <span className="d-flex align-items-center gap-1">
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "orange",
                        }}
                      ></span>
                      Manual Verification
                    </span>
                  )}
                </td>

                {/* 6. Details column */}
                <td>
                  <button
                    size="sm"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      background: "transparent",
                      padding: "4px 8px",
                    }}
                    onClick={() => handleShowDetails(r)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="md"
      >
        <Modal.Body className="p-0">
          {selectedGuest && (
            <div className="guest-details-card">
              {/* Header */}
              <div className="guest-header">
                <div className="avatar-circle">
                  {selectedGuest.name.charAt(0)}
                </div>
                <h5 className="guest-name">{selectedGuest.name}</h5>
                <span className="guest-hotel">{selectedGuest.hotel}</span>
              </div>

              {/* Body */}
              <div className="guest-body">
                <p>
                  <strong>Check-in:</strong>{" "}
                  {format(new Date(selectedGuest.checkIn), "d MMM yy, h:mm a")}
                </p>
                <p>
                  <strong>Hotel:</strong> {selectedGuest.hotel}
                </p>
                {selectedGuest.location && (
                  <p>
                    <strong>Location:</strong> {selectedGuest.location}
                  </p>
                )}
                <p>
                  <strong>Phone:</strong> {maskPhone(selectedGuest.phone)}
                </p>
                <p>
                  <strong>Staff:</strong> {selectedGuest.staffName}
                </p>
                {selectedGuest.aadhaar && (
                  <p>
                    <strong>ID:</strong> {getMaskedAadhaar(selectedGuest)}
                  </p>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllGuestRecords;
