import React, { useState } from "react";
import { Table, Modal } from "react-bootstrap";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./AllGuestRecords.css";
import { HiOutlineDownload } from "react-icons/hi";
import DateHoursFilter from "../components/Filter/DateHoursFilter";
import User1 from "../assets/images/User-1.jpg";

const AllGuestRecords = () => {
  const [records] = useState([
    {
      reservation: "RES3031",
      name: "Emily Davis",
      hotel: "Silver Sands",
      location: "Vashi, Navi Mumbai",
      phone: "9765021375",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-17 02:50 PM",
      staffName: "Sneha Reddy",
      gender: "Female",
      dob: "12 Dec 1990",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-9821",
      email: "emily.davis@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "17 Aug 2025, 03:05 PM",
        verifiedBy: "HC-User198",
      },
      dependents: [
        { name: "Ryan Davis", age: 8, guardian: "Emily Davis" },
        { name: "Sophia Davis", age: 5, guardian: "Emily Davis" },
      ],
    },
    {
      reservation: "RES3032",
      name: "Ravi Kumar",
      hotel: "Palm Residency",
      location: "Andheri East, Mumbai",
      phone: "9876543210",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-18 11:10 AM",
      staffName: "Karan Mehta",
      gender: "Male",
      dob: "10 Jan 1985",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-4512",
      email: "ravi.kumar@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "18 Aug 2025, 11:20 AM",
        verifiedBy: "HC-User143",
      },
      dependents: [],
    },
    {
      reservation: "RES3033",
      name: "Aarav Sharma",
      hotel: "Ocean View",
      location: "Calangute, Goa",
      phone: "9823007654",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-19 04:15 PM",
      staffName: "Maya Fernandes",
      gender: "Male",
      dob: "22 Mar 1993",
      nationality: "Indian",
      govtIdType: "Passport",
      govtIdNumber: "M1234567",
      email: "aarav.sharma@yahoo.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "19 Aug 2025, 04:20 PM",
        verifiedBy: "HC-User152",
      },
      dependents: [{ name: "Riya Sharma", age: 2, guardian: "Aarav Sharma" }],
    },
    {
      reservation: "RES3034",
      name: "Sophia Thomas",
      hotel: "Hilltop Resort",
      location: "Pallivasal, Munnar",
      phone: "9811122233",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-20 09:00 AM",
      staffName: "Anil Nair",
      gender: "Female",
      dob: "18 Jul 1989",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-9023",
      email: "sophia.t@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "20 Aug 2025, 09:10 AM",
        verifiedBy: "HC-User110",
      },
      dependents: [],
    },
    {
      reservation: "RES3035",
      name: "Arjun Patel",
      hotel: "Sunrise Suites",
      location: "Navrangpura, Ahmedabad",
      phone: "9798123456",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-20 06:45 PM",
      staffName: "Sneha Reddy",
      gender: "Male",
      dob: "09 Sep 1992",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-6654",
      email: "arjun.patel@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "20 Aug 2025, 06:55 PM",
        verifiedBy: "HC-User198",
      },
      dependents: [{ name: "Neha Patel", age: 4, guardian: "Arjun Patel" }],
    },
    {
      reservation: "RES3036",
      name: "Meera Iyer",
      hotel: "Blue Lagoon",
      location: "Besant Nagar, Chennai",
      phone: "9765432109",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-21 10:30 AM",
      staffName: "Ramesh Pillai",
      gender: "Female",
      dob: "05 Oct 1995",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-3278",
      email: "meera.iyer@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "21 Aug 2025, 10:40 AM",
        verifiedBy: "HC-User115",
      },
      dependents: [],
    },
    {
      reservation: "RES3037",
      name: "Daniel Johnson",
      hotel: "Royal Orchid",
      location: "Whitefield, Bangalore",
      phone: "9845098765",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-22 01:15 PM",
      staffName: "Lakshmi Rao",
      gender: "Male",
      dob: "25 May 1987",
      nationality: "Indian",
      govtIdType: "Passport",
      govtIdNumber: "K9876543",
      email: "daniel.j@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "22 Aug 2025, 01:20 PM",
        verifiedBy: "HC-User203",
      },
      dependents: [
        { name: "David Johnson", age: 12, guardian: "Daniel Johnson" },
      ],
    },
    {
      reservation: "RES3038",
      name: "Priya Menon",
      hotel: "Lotus Inn",
      location: "Koregaon Park, Pune",
      phone: "9898989898",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-23 08:30 AM",
      staffName: "Rohit Verma",
      gender: "Female",
      dob: "11 Apr 1994",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-5612",
      email: "priya.menon@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "23 Aug 2025, 08:40 AM",
        verifiedBy: "HC-User188",
      },
      dependents: [],
    },
    {
      reservation: "RES3039",
      name: "Kabir Singh",
      hotel: "Elite Stay",
      location: "Connaught Place, Delhi",
      phone: "9812345678",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-23 07:20 PM",
      staffName: "Nidhi Sharma",
      gender: "Male",
      dob: "30 Aug 1988",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-8123",
      email: "kabir.singh@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "23 Aug 2025, 07:25 PM",
        verifiedBy: "HC-User176",
      },
      dependents: [
        { name: "Ishaan Singh", age: 9, guardian: "Kabir Singh" },
        { name: "Aanya Singh", age: 6, guardian: "Kabir Singh" },
      ],
    },
    {
      reservation: "RES3040",
      name: "Neha Gupta",
      hotel: "City Comfort",
      location: "Hazratganj, Lucknow",
      phone: "9797001234",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-24 02:00 PM",
      staffName: "Suresh Yadav",
      gender: "Female",
      dob: "14 Jun 1991",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-4456",
      email: "neha.gupta@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "24 Aug 2025, 02:05 PM",
        verifiedBy: "HC-User189",
      },
      dependents: [],
    },
    {
      reservation: "RES3041",
      name: "Rahul Desai",
      hotel: "Harbor View",
      location: "Marine Drive, Cochin",
      phone: "9847091234",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-25 12:45 PM",
      staffName: "Ananya Iyer",
      gender: "Male",
      dob: "02 Feb 1986",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-7781",
      email: "rahul.desai@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "25 Aug 2025, 12:50 PM",
        verifiedBy: "HC-User174",
      },
      dependents: [],
    },
    {
      reservation: "RES3042",
      name: "Anjali Verma",
      hotel: "Saffron Stay",
      location: "Bani Park, Jaipur",
      phone: "9823123456",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-26 05:00 PM",
      staffName: "Harish Malhotra",
      gender: "Female",
      dob: "07 Nov 1992",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-5521",
      email: "anjali.verma@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "26 Aug 2025, 05:05 PM",
        verifiedBy: "HC-User190",
      },
      dependents: [{ name: "Aryan Verma", age: 3, guardian: "Anjali Verma" }],
    },
    {
      reservation: "RES3043",
      name: "Siddharth Rao",
      hotel: "Green Valley",
      location: "Mall Road, Shimla",
      phone: "9800123456",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-27 10:00 AM",
      staffName: "Meera Das",
      gender: "Male",
      dob: "21 Jan 1990",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-8842",
      email: "siddharth.rao@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "27 Aug 2025, 10:10 AM",
        verifiedBy: "HC-User193",
      },
      dependents: [],
    },
    {
      reservation: "RES3044",
      name: "Olivia Wilson",
      hotel: "Coral Beach",
      location: "Colva, Goa",
      phone: "9812012345",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-08-28 03:25 PM",
      staffName: "Rohan Naik",
      gender: "Female",
      dob: "19 Mar 1991",
      nationality: "Indian",
      govtIdType: "Passport",
      govtIdNumber: "P1239876",
      email: "olivia.wilson@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "28 Aug 2025, 03:30 PM",
        verifiedBy: "HC-User200",
      },
      dependents: [],
    },
    {
      reservation: "RES3045",
      name: "Vikram Joshi",
      hotel: "Lake View",
      location: "Fateh Sagar, Udaipur",
      phone: "9823001234",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-29 01:40 PM",
      staffName: "Shruti Agarwal",
      gender: "Male",
      dob: "16 Oct 1984",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-9910",
      email: "vikram.joshi@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "29 Aug 2025, 01:50 PM",
        verifiedBy: "HC-User167",
      },
      dependents: [{ name: "Aarohi Joshi", age: 6, guardian: "Vikram Joshi" }],
    },
    {
      reservation: "RES3046",
      name: "Kavya Nair",
      hotel: "Grand Palace",
      location: "Park Street, Kolkata",
      phone: "9833009876",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-30 09:15 AM",
      staffName: "Aditya Banerjee",
      gender: "Female",
      dob: "28 Aug 1993",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-5411",
      email: "kavya.nair@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "30 Aug 2025, 09:20 AM",
        verifiedBy: "HC-User183",
      },
      dependents: [],
    },
    {
      reservation: "RES3047",
      name: "Nikhil Arora",
      hotel: "Sunset Resort",
      location: "Old Manali, Manali",
      phone: "9821122233",
      verification: "Aadhaar",
      faceMatch: "Match",
      checkIn: "2025-08-31 05:30 PM",
      staffName: "Tanvi Kapoor",
      gender: "Male",
      dob: "03 Jul 1989",
      nationality: "Indian",
      govtIdType: "Aadhaar",
      govtIdNumber: "XXXX-XXXX-7210",
      email: "nikhil.arora@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "31 Aug 2025, 05:40 PM",
        verifiedBy: "HC-User175",
      },
      dependents: [],
    },
    {
      reservation: "RES3048",
      name: "Isabella Fernandes",
      hotel: "Seaview Hotel",
      location: "Miramar Beach, Goa",
      phone: "9876012345",
      verification: "Passport",
      faceMatch: "Match",
      checkIn: "2025-09-01 11:05 AM",
      staffName: "Sameer Khan",
      gender: "Female",
      dob: "06 Jun 1996",
      nationality: "Indian",
      govtIdType: "Passport",
      govtIdNumber: "N1234567",
      email: "isabella.f@gmail.com",
      aadhaarVerification: {
        status: "Verified",
        faceId: "Match",
        manualVerification: "Not Required",
        verifiedOn: "01 Sep 2025, 11:10 AM",
        verifiedBy: "HC-User210",
      },
      dependents: [],
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
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <DateHoursFilter />
        </div>
        <div className="d-flex gap-2">
          <button className="pill-btn" onClick={exportCSV}>
            <HiOutlineDownload size={18} /> Export Excel
          </button>
          <button className="pill-btn" onClick={exportPDF}>
            <HiOutlineDownload size={18} /> Export PDF
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
              <th>Reservation</th>
              <th>Guest Name</th>
              <th>Phone</th>
              <th>Verification</th>
              <th></th>
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

                {/* 3. Reservation number */}
                <td>{r.reservation}</td>

                {/* 4. Guest Name */}
                <td>{r.name}</td>

                {/* 5. Phone (masked) */}
                <td>{maskPhone(r.phone)}</td>

                {/* 6. Verification status */}
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

                {/* 7. Details link (row only, no header) */}
                <td>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                    onClick={() => handleShowDetails(r)}
                  >
                    View Details
                  </span>
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
        size="lg"
        className="border-0"
      >
        <Modal.Body className="p-0 position-relative">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          ></button>

          {selectedGuest && (
            <div className="guest-profile-card">
              <div className="profile-header shadow-sm d-flex align-items-center p-3 border-bottom">
                <div className="d-flex align-items-center me-4 pe-4 border-end">
                  <div className="avatar-circle me-3">
                    <img
                      src={User1}
                      alt={selectedGuest.name}
                      className="guest-avatar"
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">{selectedGuest.name}</h5>
                    <small className="text-muted">
                      {selectedGuest.hotel} | {selectedGuest.location}
                    </small>
                  </div>
                </div>

                <div className="info-section">
                  <p>
                    <span style={{ fontWeight: 600 }}>
                      Check-in Date & Time:
                    </span>{" "}
                    {format(
                      new Date(selectedGuest.checkIn),
                      "d MMM yyyy, h:mm a"
                    )}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Reservation Number:</span>{" "}
                    {selectedGuest.reservation}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Property Name:</span>{" "}
                    {selectedGuest.hotel}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Property Location:</span>{" "}
                    {selectedGuest.location}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Personal Information
                        </h6>
                        <p>
                          <span style={{ fontWeight: 600 }}>Gender:</span>{" "}
                          {selectedGuest.gender}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Date of Birth:
                          </span>{" "}
                          {selectedGuest.dob}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Nationality:</span>{" "}
                          {selectedGuest.nationality}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Government ID Type:
                          </span>{" "}
                          {selectedGuest.govtIdType}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Government ID Number:
                          </span>{" "}
                          {selectedGuest.govtIdNumber}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Phone Number:</span>{" "}
                          {maskPhone(selectedGuest.phone)}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Email:</span>{" "}
                          {selectedGuest.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex flex-column gap-4">
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Aadhaar Verification
                        </h6>
                        <p>
                          <span style={{ fontWeight: 600 }}>Status:</span>{" "}
                          {selectedGuest.aadhaarVerification.status}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Face ID:</span>{" "}
                          <span
                            style={{
                              color:
                                selectedGuest.aadhaarVerification.faceId ===
                                "Match"
                                  ? "green"
                                  : "red",
                              fontWeight: 600,
                            }}
                          >
                            ●
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.faceId}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Manual Verification:
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.manualVerification}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Verified On:</span>{" "}
                          {selectedGuest.aadhaarVerification.verifiedOn}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Verified By (Hotel Staff ID):
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.verifiedBy}
                        </p>
                      </div>
                    </div>

                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Dependents Information
                        </h6>
                        {selectedGuest.dependents.length > 0 ? (
                          selectedGuest.dependents.map((d, idx) => (
                            <div key={idx} className="mb-2">
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  Dependent {idx + 1}:
                                </span>{" "}
                                {d.name} (Age: {d.age})
                              </p>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  Guardian:
                                </span>{" "}
                                {d.guardian}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">No dependents available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllGuestRecords;
