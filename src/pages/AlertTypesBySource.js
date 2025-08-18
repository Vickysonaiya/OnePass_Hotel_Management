// import React from 'react';

// const AlertTypesBySource = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Alert Types by Source</h4>
//     </div>
// );

// export default AlertTypesBySource;

import React, { useState } from "react";
import "./visits.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
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

const AlertTypesBySource = () => {
  const [activeFilter, setActiveFilter] = useState("Checked-in");

  const mainFilters = [
    "Fire Alarm Alerts",
    "Security Camera Alerts",
    "Sensor Alerts",
    "Access Control Alerts",
    "Environmental Alerts",
  ];
  const tableData = [
    {
      id: 1,
      AlertTime: "Aug 8, 3:05 PM",
      SourceType: "Fire Alarm",
      SourceName: "Fire Alarm Sensor #A1",
      Location: "Lobby",
      AlertDescription: "Smoke Detected",
      Severity: "Critical",
      Status: "New",
      AssignedTo: "John Doe",
    },
    {
      id: 2,
      AlertTime: "Aug 8, 3:10 PM",
      SourceType: "Security Camera",
      SourceName: "Camera #3",
      Location: "Parking Lot",
      AlertDescription: "Unauthorized Access",
      Severity: "High",
      Status: "Ongoing",
      AssignedTo: "Robert Brown",
    },
    {
      id: 3,
      AlertTime: "Aug 8, 3:15 PM",
      SourceType: "Sensor",
      SourceName: "Temperature Sensor #T1",
      Location: "Server Room",
      AlertDescription: "Overheating Detected",
      Severity: "Medium",
      Status: "New",
      AssignedTo: "Jane Smith",
    },
    {
      id: 4,
      AlertTime: "Aug 8, 3:20 PM",
      SourceType: "Security Camera",
      SourceName: "CCTV Camera #5",
      Location: "Loading Dock",
      AlertDescription: "Suspicious Activity",
      Severity: "High",
      Status: "Resolved",
      AssignedTo: "Mike Johnson",
    },
    {
      id: 5,
      AlertTime: "Aug 8, 3:25 PM",
      SourceType: "Access Control",
      SourceName: "Door Sensor #D2",
      Location: "Main Entrance",
      AlertDescription: "Forced Entry Attempt",
      Severity: "Critical",
      Status: "Ongoing",
      AssignedTo: "Security Team",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visits Report", 14, 10);

    const tableColumn = [
      "Alert Time",
      "Source Type",
      "Source Name",
      "Location",
      "Alert Description",
      "Severity",
      "Status",
      "Assigned To",
    ];

    const tableRows = tableData.map((row) => [
      row.AlertTime,
      row.SourceType,
      row.SourceName,
      row.Location,
      row.AlertDescription,
      row.Severity,
      row.Status,
      row.AssignedTo,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("visits_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visits");
    XLSX.writeFile(wb, "visits_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Alert Types By Source</h4>
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

        {/* Right side action buttons */}

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
              <th className="table-cell">Alert Time</th>
              <th className="table-cell">Source Type</th>
              <th className="table-cell">Source Name</th>
              <th className="table-cell">Location</th>
              <th className="table-cell">Alert Description</th>
              <th className="table-cell">Severity</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">
                  <div className="flex-wrap gap-1">{row.AlertTime}</div>
                </td>
                <td className="table-cell">
                  <span>{row.SourceType}</span>
                </td>
                <td className="table-cell">
                  <span>{row.SourceName}</span>
                </td>
                <td className="table-cell">{row.Location}</td>
                <td className="table-cell">{row.AlertDescription}</td>
                <td className="table-cell">{row.Severity}</td>
                <td className="table-cell">{row.Status}</td>
                <td className="table-cell">{row.AssignedTo}</td>
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

export default AlertTypesBySource;
