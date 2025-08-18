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

const AccessPointsStatus = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Online", "Offline", "Fault"];

  const tableData = [
    {
      id: 1,
      AccessPoint: "Main Entrance Gate",
      Location: "North Wing",
      Status: "Online",
      LastActivity: "Aug 9, 08:15 AM",
      Notes: "Operational",
    },
    {
      id: 2,
      AccessPoint: "Loading Dock Door",
      Location: "South Wing",
      Status: "Offline",
      LastActivity: "Aug 9, 07:42 AM",
      Notes: "Power issue reported",
    },
    {
      id: 3,
      AccessPoint: "Lobby Turnstile #3",
      Location: "Main Lobby",
      Status: "Fault",
      LastActivity: "Aug 9, 08:00 AM",
      Notes: "Card reader malfunction",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Access Points Status Report", 14, 10);

    const tableColumn = [
      "Access Point",
      "Location",
      "Status",
      "Last Activity",
      "Notes",
    ];

    const tableRows = tableData.map((row) => [
      row.AccessPoint,
      row.Location,
      row.Status,
      row.LastActivity,
      row.Notes,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("access_points_status.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Access Points Status");
    XLSX.writeFile(wb, "access_points_status.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Access Points Status</h4>
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
              <th>Access Point</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Activity</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.AccessPoint}</td>
                <td>{row.Location}</td>
                <td>{row.Status}</td>
                <td>{row.LastActivity}</td>
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

export default AccessPointsStatus;
