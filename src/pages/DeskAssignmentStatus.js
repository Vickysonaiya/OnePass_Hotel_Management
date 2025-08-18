// import React from 'react';

// const DeskAssignmentStatus = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Desk Assignment Status</h4>
//     </div>
// );

// export default DeskAssignmentStatus;

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

const DeskAssignmentStatus = () => {
  const [activeFilter, setActiveFilter] = useState("Assigned");

  const mainFilters = [
    "Assigned",
    "Unassigned",
    "Pending Approval",
    "Occupied",
    "Available",
  ];

  const tableData = [
    {
      id: 1,
      DeskID: "D-101",
      AssignedTo: "John Doe",
      AssignmentDate: "Aug 8, 9:00 AM",
      Status: "Assigned",
      Remarks: "Near window",
    },
    {
      id: 2,
      DeskID: "D-202",
      AssignedTo: "-",
      AssignmentDate: "-",
      Status: "Unassigned",
      Remarks: "Needs cleaning",
    },
    {
      id: 3,
      DeskID: "D-303",
      AssignedTo: "Sarah Lee",
      AssignmentDate: "Aug 7, 11:00 AM",
      Status: "Occupied",
      Remarks: "Reserved for project team",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Desk Assignment Status Report", 14, 10);

    const tableColumn = [
      "Desk ID",
      "Assigned To",
      "Assignment Date",
      "Status",
      "Remarks",
    ];

    const tableRows = tableData.map((row) => [
      row.DeskID,
      row.AssignedTo,
      row.AssignmentDate,
      row.Status,
      row.Remarks,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("desk_assignment_status_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Desk Assignment Status");
    XLSX.writeFile(wb, "desk_assignment_status_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Desk Assignment Status</h4>
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
              <th className="table-cell">Desk ID</th>
              <th className="table-cell">Assigned To</th>
              <th className="table-cell">Assignment Date</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.DeskID}</td>
                <td className="table-cell">{row.AssignedTo}</td>
                <td className="table-cell">{row.AssignmentDate}</td>
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

export default DeskAssignmentStatus;
