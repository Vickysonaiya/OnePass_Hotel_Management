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

const AnomalyDetectionAlerts = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Critical", "Warning", "Resolved"];

  const tableData = [
    {
      id: 1,
      AlertID: "ANM-001",
      Description: "Unusual access at Service Gate at 2:45 AM",
      Severity: "Critical",
      DetectedAt: "02:45 AM",
      Location: "Service Gate",
      AssignedTo: "Guard-101",
      Status: "Critical",
      Date: "Aug 10, 2025",
    },
    {
      id: 2,
      AlertID: "ANM-002",
      Description: "Multiple failed access attempts in short time",
      Severity: "Warning",
      DetectedAt: "09:15 PM",
      Location: "Main Entrance",
      AssignedTo: "Guard-203",
      Status: "Warning",
      Date: "Aug 9, 2025",
    },
    {
      id: 3,
      AlertID: "ANM-003",
      Description: "Tailgating detected via CCTV",
      Severity: "Resolved",
      DetectedAt: "05:20 PM",
      Location: "Lobby Gate",
      AssignedTo: "Guard-110",
      Status: "Resolved",
      Date: "Aug 9, 2025",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Anomaly Detection Alerts", 14, 10);

    const tableColumn = [
      "Alert ID",
      "Description",
      "Severity",
      "Detected At",
      "Location",
      "Assigned To",
      "Status",
      "Date",
    ];

    const tableRows = tableData.map((row) => [
      row.AlertID,
      row.Description,
      row.Severity,
      row.DetectedAt,
      row.Location,
      row.AssignedTo,
      row.Status,
      row.Date,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("anomaly_detection_alerts.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Anomaly Detection Alerts");
    XLSX.writeFile(wb, "anomaly_detection_alerts.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Anomaly Detection Alerts</h4>
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
              <th>Alert ID</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Detected At</th>
              <th>Location</th>
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
                <td>{row.AlertID}</td>
                <td>{row.Description}</td>
                <td>{row.Severity}</td>
                <td>{row.DetectedAt}</td>
                <td>{row.Location}</td>
                <td>{row.AssignedTo}</td>
                <td>{row.Status}</td>
                <td>{row.Date}</td>
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

export default AnomalyDetectionAlerts;
