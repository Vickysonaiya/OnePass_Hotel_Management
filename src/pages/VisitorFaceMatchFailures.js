import React, { useState } from "react";
import "./visits.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import UnitFilter from "../components/MoreFilters/UnitFilter/UnitFilter";
import StatusFilter from "../components/MoreFilters/StatusFilter/StatusFilter";
import DeskFilter from "../components/MoreFilters/DeskFilter/DeskFilter";
import PropertyFilter from "../components/MoreFilters/PropertyFilter/PropertyFilter";
import DateHourFilter from "../components/Filter/DateHoursFilter";

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-download"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const VisitorFaceMatchFailures = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "High Risk", "Under Review", "Cleared"];

  const tableData = [
    {
      id: 1,
      FailureID: "FMF-001",
      CaptureTime: "08:45 AM",
      VisitorName: "John Doe",
      Location: "Lobby Entrance",
      CameraID: "CAM-05",
      Severity: "High Risk",
      AssignedTo: "Guard-201",
      Status: "High Risk",
      Date: "Aug 11, 2025",
    },
    {
      id: 2,
      FailureID: "FMF-002",
      CaptureTime: "02:18 PM",
      VisitorName: "Emily Carter",
      Location: "Parking Gate",
      CameraID: "CAM-08",
      Severity: "Under Review",
      AssignedTo: "Guard-104",
      Status: "Under Review",
      Date: "Aug 11, 2025",
    },
    {
      id: 3,
      FailureID: "FMF-003",
      CaptureTime: "06:05 PM",
      VisitorName: "Unknown",
      Location: "Service Entry",
      CameraID: "CAM-13",
      Severity: "Cleared",
      AssignedTo: "Guard-315",
      Status: "Cleared",
      Date: "Aug 10, 2025",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visitor FaceMatch Failures", 14, 10);

    const tableColumn = [
      "Failure ID",
      "Capture Time",
      "Visitor Name",
      "Location",
      "Camera ID",
      "Severity",
      "Assigned To",
      "Status",
      "Date",
    ];

    const tableRows = tableData.map((row) => [
      row.FailureID,
      row.CaptureTime,
      row.VisitorName,
      row.Location,
      row.CameraID,
      row.Severity,
      row.AssignedTo,
      row.Status,
      row.Date,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("visitor_facematch_failures.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitor FaceMatch Failures");
    XLSX.writeFile(wb, "visitor_facematch_failures.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Visitor FaceMatch Failures</h4>
      <div className="dashboard-container">
        {/* Main Filters */}
        <div className="flex-wrap gap-2 mb-3">
          {mainFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`main-filter-button ${
                activeFilter === filter ? "active" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Filters & Export Buttons */}
        <div className="flex-wrap gap-2 justify-content-between">
          <div className="flex-wrap gap-2">
            <UnitFilter />
            <StatusFilter />
            <DeskFilter />
            <PropertyFilter />
            <DateHourFilter />
          </div>
          <div className="exportBtn">
            <button
              className="secondary-button"
              onClick={exportPDF}
              style={{ marginRight: "5px" }}
            >
              <ExportIcon />
              Export PDF
            </button>
            <button className="secondary-button" onClick={exportExcel}>
              <ExportIcon />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <hr className="hrLine" />

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Failure ID</th>
              <th>Capture Time</th>
              <th>Visitor Name</th>
              <th>Location</th>
              <th>Camera ID</th>
              <th>Severity</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.FailureID}</td>
                <td>{row.CaptureTime}</td>
                <td>{row.VisitorName}</td>
                <td>{row.Location}</td>
                <td>{row.CameraID}</td>
                <td>{row.Severity}</td>
                <td>{row.AssignedTo}</td>
                <td>{row.Status}</td>
                <td>{row.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Row Count */}
        <div className="text-gray-500 text-sm mb-4">
          {tableData.length} results
        </div>
      </div>
    </div>
  );
};

export default VisitorFaceMatchFailures;
