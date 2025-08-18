// import React from 'react';

// const UnitAccessProfiles = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Unit Access Profiles</h4>
//   </div>
// );

// export default UnitAccessProfiles;

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

const UnitAccessProfiles = () => {
  const [activeFilter, setActiveFilter] = useState("Active");

  const mainFilters = [
    "Active",
    "Inactive",
    "Pending Approval",
    "Revoked",
    "Expired",
  ];

  const tableData = [
    {
      id: 1,
      UnitID: "U-101",
      OccupantName: "Alice Johnson",
      AccessLevel: "Full",
      Status: "Active",
      Remarks: "24/7 access granted",
    },
    {
      id: 2,
      UnitID: "U-205",
      OccupantName: "Michael Smith",
      AccessLevel: "Restricted",
      Status: "Pending Approval",
      Remarks: "Awaiting background check",
    },
    {
      id: 3,
      UnitID: "U-309",
      OccupantName: "Karen Williams",
      AccessLevel: "Full",
      Status: "Revoked",
      Remarks: "Violation of policy",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Unit Access Profiles Report", 14, 10);

    const tableColumn = [
      "Unit ID",
      "Occupant Name",
      "Access Level",
      "Status",
      "Remarks",
    ];

    const tableRows = tableData.map((row) => [
      row.UnitID,
      row.OccupantName,
      row.AccessLevel,
      row.Status,
      row.Remarks,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("unit_access_profiles_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Unit Access Profiles");
    XLSX.writeFile(wb, "unit_access_profiles_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Unit Access Profiles</h4>
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
              <th className="table-cell">Unit ID</th>
              <th className="table-cell">Occupant Name</th>
              <th className="table-cell">Access Level</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.UnitID}</td>
                <td className="table-cell">{row.OccupantName}</td>
                <td className="table-cell">{row.AccessLevel}</td>
                <td className="table-cell">{row.Status}</td>
                <td className="table-cell">{row.Remarks}</td>
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

export default UnitAccessProfiles;
