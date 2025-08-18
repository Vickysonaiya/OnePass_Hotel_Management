// import React from "react";

// const OverstayAlerts = () => (
//   <div className="header_title">
//     <h4 className="mb-3">Overstay Alerts</h4>
//   </div>
// );

// export default OverstayAlerts;

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

const OverstayAlerts = () => {
  const [activeFilter, setActiveFilter] = useState("Active");

  const mainFilters = [
    "Active",
    "Resolved",
    "Pending Review",
    "Critical",
    "Acknowledged",
  ];

  const tableData = [
    {
      id: 1,
      AlertTime: "Aug 8, 4:10 PM",
      GuestName: "Vicky",
      Host: "John Doe",
      OverstayDuration: "2 hrs",
      Location: "Meeting Room 3",
      Status: "Active",
    },
    {
      id: 2,
      AlertTime: "Aug 8, 4:20 PM",
      GuestName: "Hafiz",
      Host: "Sarah Lee",
      OverstayDuration: "1 hr 45 min",
      Location: "Lobby",
      Status: "Pending Review",
    },
    {
      id: 3,
      AlertTime: "Aug 8, 4:25 PM",
      GuestName: "Amit",
      Host: "John Doe",
      OverstayDuration: "3 hrs 10 min",
      Location: "Conference Hall",
      Status: "Critical",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Overstay Alerts Report", 14, 10);

    const tableColumn = [
      "Alert Time",
      "Guest Name",
      "Host",
      "Overstay Duration",
      "Location",
      "Status",
    ];

    const tableRows = tableData.map((row) => [
      row.AlertTime,
      row.GuestName,
      row.Host,
      row.OverstayDuration,
      row.Location,
      row.Status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("overstay_alerts_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Overstay Alerts");
    XLSX.writeFile(wb, "overstay_alerts_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Overstay Alerts</h4>
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
              <th className="table-cell">Guest Name</th>
              <th className="table-cell">Host</th>
              <th className="table-cell">Overstay Duration</th>
              <th className="table-cell">Location</th>
              <th className="table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.AlertTime}</td>
                <td className="table-cell">{row.GuestName}</td>
                <td className="table-cell">{row.Host}</td>
                <td className="table-cell">{row.OverstayDuration}</td>
                <td className="table-cell">{row.Location}</td>
                <td className="table-cell">{row.Status}</td>
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

export default OverstayAlerts;
