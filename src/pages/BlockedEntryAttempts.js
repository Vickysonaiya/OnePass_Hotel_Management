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

const BlockedEntryAttempts = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Invalid Credentials", "Access Revoked", "Suspicious Behavior"];

  const tableData = [
    {
      id: 1,
      AttemptTime: "Aug 9, 07:45 AM",
      PersonName: "Michael Ross",
      Location: "Main Gate",
      Method: "RFID Card",
      Status: "Invalid Credentials",
      Reason: "Card not recognized",
    },
    {
      id: 2,
      AttemptTime: "Aug 9, 08:12 AM",
      PersonName: "Nina Lopez",
      Location: "Service Entrance",
      Method: "Face Recognition",
      Status: "Access Revoked",
      Reason: "Removed from access list",
    },
    {
      id: 3,
      AttemptTime: "Aug 9, 08:30 AM",
      PersonName: "Unknown",
      Location: "North Exit Door",
      Method: "Keypad PIN",
      Status: "Suspicious Behavior",
      Reason: "Multiple failed PIN attempts",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Blocked Entry Attempts Report", 14, 10);

    const tableColumn = [
      "Attempt Time",
      "Person Name",
      "Location",
      "Method Used",
      "Status",
      "Reason",
    ];

    const tableRows = tableData.map((row) => [
      row.AttemptTime,
      row.PersonName,
      row.Location,
      row.Method,
      row.Status,
      row.Reason,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("blocked_entry_attempts.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Blocked Entry Attempts");
    XLSX.writeFile(wb, "blocked_entry_attempts.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Blocked Entry Attempts</h4>
      <div className="dashboard-container">
        {/* Main Filter Buttons */}
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

        {/* Right side filters and export */}
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

      {/* Data Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Attempt Time</th>
              <th>Person Name</th>
              <th>Location</th>
              <th>Method Used</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.AttemptTime}</td>
                <td>{row.PersonName}</td>
                <td>{row.Location}</td>
                <td>{row.Method}</td>
                <td>{row.Status}</td>
                <td>{row.Reason}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Results Count */}
        <div className="text-gray-500 text-sm mb-4">
          {tableData.length} results
        </div>
      </div>
    </div>
  );
};

export default BlockedEntryAttempts;
