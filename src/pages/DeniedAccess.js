import React, { useState } from "react";
import "./visits.css"; // Reusing same styles
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

const DeniedAccess = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = [
    "All",
    "Visitors",
    "Contractors",
    "Staff",
    "Vendors",
  ];

  const tableData = [
    {
      id: 1,
      Time: "Aug 10, 9:15 AM",
      PersonName: "David Smith",
      Role: "Visitor",
      Reason: "Expired Pass",
      AttemptedEntry: "Gate 2",
      ActionTaken: "Denied",
    },
    {
      id: 2,
      Time: "Aug 10, 11:05 AM",
      PersonName: "Sophia Brown",
      Role: "Contractor",
      Reason: "Unauthorized Area",
      AttemptedEntry: "Server Room",
      ActionTaken: "Escorted Out",
    },
    {
      id: 3,
      Time: "Aug 10, 1:40 PM",
      PersonName: "Liam Johnson",
      Role: "Vendor",
      Reason: "No Approval",
      AttemptedEntry: "Delivery Dock",
      ActionTaken: "Denied",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Denied Access Report", 14, 10);

    const tableColumn = [
      "Time",
      "Name",
      "Role",
      "Reason",
      "Attempted Entry",
      "Action Taken",
    ];

    const tableRows = tableData.map((row) => [
      row.Time,
      row.PersonName,
      row.Role,
      row.Reason,
      row.AttemptedEntry,
      row.ActionTaken,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("denied_access_report.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Denied Access");
    XLSX.writeFile(wb, "denied_access_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Denied Access</h4>
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

        {/* Filters + Export */}
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
              style={{ marginRight: "4px" }}
            >
              <ExportIcon /> Export PDF
            </button>
            <button className="secondary-button" onClick={exportExcel}>
              <ExportIcon /> Export Excel
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
              <th className="table-cell">Time</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Role</th>
              <th className="table-cell">Reason</th>
              <th className="table-cell">Attempted Entry</th>
              <th className="table-cell">Action Taken</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.Time}</td>
                <td className="table-cell">{row.PersonName}</td>
                <td className="table-cell">{row.Role}</td>
                <td className="table-cell">{row.Reason}</td>
                <td className="table-cell">{row.AttemptedEntry}</td>
                <td className="table-cell">{row.ActionTaken}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-gray-500 text-sm mb-4">
          {tableData.length} results
        </div>
      </div>
    </div>
  );
};

export default DeniedAccess;
