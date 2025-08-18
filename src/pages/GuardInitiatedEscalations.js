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

const GuardInitiatedEscalations = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Pending", "Resolved"];

  const tableData = [
    {
      id: 1,
      EscalationID: "E-101",
      GuardName: "Ravi Kumar",
      Location: "North Gate",
      Incident: "Suspicious vehicle parked for over 2 hours",
      TimeReported: "09:15 AM",
      Severity: "High",
      Status: "Pending",
    },
    {
      id: 2,
      EscalationID: "E-102",
      GuardName: "Suresh Patel",
      Location: "Lobby",
      Incident: "Unidentified individual bypassed check-in",
      TimeReported: "02:30 PM",
      Severity: "Medium",
      Status: "Resolved",
    },
    {
      id: 3,
      EscalationID: "E-103",
      GuardName: "Amit Sharma",
      Location: "Parking Lot",
      Incident: "Aggressive behavior by visitor",
      TimeReported: "10:45 PM",
      Severity: "High",
      Status: "Pending",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Guard-Initiated Escalations", 14, 10);

    const tableColumn = [
      "Escalation ID",
      "Guard Name",
      "Location",
      "Incident",
      "Time Reported",
      "Severity",
      "Status",
    ];
    const tableRows = tableData.map((row) => [
      row.EscalationID,
      row.GuardName,
      row.Location,
      row.Incident,
      row.TimeReported,
      row.Severity,
      row.Status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("guard_initiated_escalations.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Guard Escalations");
    XLSX.writeFile(wb, "guard_initiated_escalations.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Guard-Initiated Escalations</h4>
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

      {/* Escalations Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Escalation ID</th>
              <th>Guard Name</th>
              <th>Location</th>
              <th>Incident</th>
              <th>Time Reported</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.EscalationID}</td>
                <td>{row.GuardName}</td>
                <td>{row.Location}</td>
                <td>{row.Incident}</td>
                <td>{row.TimeReported}</td>
                <td>{row.Severity}</td>
                <td>{row.Status}</td>
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

export default GuardInitiatedEscalations;
