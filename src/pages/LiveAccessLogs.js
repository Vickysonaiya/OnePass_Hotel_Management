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

const LiveAccessLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Successful Entry", "Denied Entry", "Pending Review"];

  const tableData = [
    {
      id: 1,
      AccessTime: "Aug 9, 09:12 AM",
      VisitorName: "John Carter",
      AccessPoint: "North Gate",
      CardID: "RFID-1023",
      Status: "Successful Entry",
      Notes: "Access granted via RFID card",
    },
    {
      id: 2,
      AccessTime: "Aug 9, 09:15 AM",
      VisitorName: "Sara Kim",
      AccessPoint: "Main Lobby",
      CardID: "RFID-2211",
      Status: "Denied Entry",
      Notes: "Card expired - redirected to reception",
    },
    {
      id: 3,
      AccessTime: "Aug 9, 09:20 AM",
      VisitorName: "Alex Gomez",
      AccessPoint: "West Loading Bay",
      CardID: "RFID-3345",
      Status: "Pending Review",
      Notes: "Manual ID verification in progress",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Live Access Logs Report", 14, 10);

    const tableColumn = [
      "Access Time",
      "Visitor Name",
      "Access Point",
      "Card ID",
      "Status",
      "Notes",
    ];

    const tableRows = tableData.map((row) => [
      row.AccessTime,
      row.VisitorName,
      row.AccessPoint,
      row.CardID,
      row.Status,
      row.Notes,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("live_access_logs.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Live Access Logs");
    XLSX.writeFile(wb, "live_access_logs.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Live Access Logs</h4>
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
              <th>Access Time</th>
              <th>Visitor Name</th>
              <th>Access Point</th>
              <th>Card ID</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.AccessTime}</td>
                <td>{row.VisitorName}</td>
                <td>{row.AccessPoint}</td>
                <td>{row.CardID}</td>
                <td>{row.Status}</td>
                <td>{row.Notes}</td>
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

export default LiveAccessLogs;
