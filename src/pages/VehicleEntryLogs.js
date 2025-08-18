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

const VehicleEntryLogs = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Inside", "Exited", "Flagged"];

  const tableData = [
    {
      id: 1,
      PlateNumber: "MH12AB1234",
      VehicleType: "Car",
      DriverName: "Ravi Sharma",
      Unit: "A-101",
      EntryTime: "08:45 AM",
      ExitTime: "—",
      Status: "Inside",
      Date: "Aug 10, 2025",
    },
    {
      id: 2,
      PlateNumber: "DL08XY5678",
      VehicleType: "Motorbike",
      DriverName: "Anita Verma",
      Unit: "B-205",
      EntryTime: "07:15 AM",
      ExitTime: "08:10 AM",
      Status: "Exited",
      Date: "Aug 10, 2025",
    },
    {
      id: 3,
      PlateNumber: "KA05PQ9876",
      VehicleType: "Delivery Van",
      DriverName: "Rahul Menon",
      Unit: "Service Gate",
      EntryTime: "06:30 AM",
      ExitTime: "06:45 AM",
      Status: "Flagged",
      Date: "Aug 9, 2025",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Vehicle Entry Logs", 14, 10);

    const tableColumn = [
      "Plate Number",
      "Vehicle Type",
      "Driver Name",
      "Unit",
      "Entry Time",
      "Exit Time",
      "Status",
      "Date",
    ];

    const tableRows = tableData.map((row) => [
      row.PlateNumber,
      row.VehicleType,
      row.DriverName,
      row.Unit,
      row.EntryTime,
      row.ExitTime,
      row.Status,
      row.Date,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("vehicle_entry_logs.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicle Entry Logs");
    XLSX.writeFile(wb, "vehicle_entry_logs.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Vehicle Entry Logs</h4>
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
              <th>Plate Number</th>
              <th>Vehicle Type</th>
              <th>Driver Name</th>
              <th>Unit</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
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
                <td>{row.PlateNumber}</td>
                <td>{row.VehicleType}</td>
                <td>{row.DriverName}</td>
                <td>{row.Unit}</td>
                <td>{row.EntryTime}</td>
                <td>{row.ExitTime}</td>
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

export default VehicleEntryLogs;
