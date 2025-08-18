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

const LiveGuardStatusMap = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "On Patrol", "Stationed", "Break", "Off Duty"];

  const tableData = [
    {
      id: 1,
      GuardID: "G-101",
      Name: "Ravi Kumar",
      Location: "Main Gate",
      Status: "On Patrol",
      LastUpdate: "12:05 PM",
    },
    {
      id: 2,
      GuardID: "G-202",
      Name: "Suresh Patel",
      Location: "Lobby Entrance",
      Status: "Stationed",
      LastUpdate: "12:10 PM",
    },
    {
      id: 3,
      GuardID: "G-303",
      Name: "Amit Sharma",
      Location: "Parking Lot",
      Status: "Break",
      LastUpdate: "12:15 PM",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Live Guard Status Map", 14, 10);

    const tableColumn = ["Guard ID", "Name", "Location", "Status", "Last Update"];
    const tableRows = tableData.map((row) => [
      row.GuardID,
      row.Name,
      row.Location,
      row.Status,
      row.LastUpdate,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("live_guard_status_map.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Live Guard Status Map");
    XLSX.writeFile(wb, "live_guard_status_map.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Live Guard Status Map</h4>
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


      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Guard ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.GuardID}</td>
                <td>{row.Name}</td>
                <td>{row.Location}</td>
                <td>{row.Status}</td>
                <td>{row.LastUpdate}</td>
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

export default LiveGuardStatusMap;
