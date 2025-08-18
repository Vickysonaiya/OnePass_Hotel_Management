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

const UnrecognizedFaceLog = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Flagged", "Under Review", "Cleared"];

  const tableData = [
    {
      id: 1,
      LogID: "UFL-001",
      CaptureTime: "03:25 PM",
      Location: "Lobby Entrance",
      CameraID: "CAM-12",
      Severity: "Flagged",
      AssignedTo: "Guard-102",
      Status: "Flagged",
      Date: "Aug 10, 2025",
    },
    {
      id: 2,
      LogID: "UFL-002",
      CaptureTime: "11:15 AM",
      Location: "Parking Gate",
      CameraID: "CAM-07",
      Severity: "Under Review",
      AssignedTo: "Guard-210",
      Status: "Under Review",
      Date: "Aug 10, 2025",
    },
    {
      id: 3,
      LogID: "UFL-003",
      CaptureTime: "09:42 PM",
      Location: "Service Corridor",
      CameraID: "CAM-21",
      Severity: "Cleared",
      AssignedTo: "Guard-305",
      Status: "Cleared",
      Date: "Aug 9, 2025",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Unrecognized FaceLog", 14, 10);

    const tableColumn = [
      "Log ID",
      "Capture Time",
      "Location",
      "Camera ID",
      "Severity",
      "Assigned To",
      "Status",
      "Date",
    ];

    const tableRows = tableData.map((row) => [
      row.LogID,
      row.CaptureTime,
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

    doc.save("unrecognized_facelog.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Unrecognized FaceLog");
    XLSX.writeFile(wb, "unrecognized_facelog.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Unrecognized FaceLog</h4>
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
              <th>Log ID</th>
              <th>Capture Time</th>
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
                <td>{row.LogID}</td>
                <td>{row.CaptureTime}</td>
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

export default UnrecognizedFaceLog;
