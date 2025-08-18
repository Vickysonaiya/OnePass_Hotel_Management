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

const GuardDeviceHealthMonitor = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Online", "Offline", "Battery Low"];

  const tableData = [
    {
      id: 1,
      DeviceID: "GD-1001",
      GuardName: "Ravi Kumar",
      DeviceType: "Body Camera",
      Battery: "85%",
      Status: "Online",
      LastCheckIn: "09:15 AM",
    },
    {
      id: 2,
      DeviceID: "GD-1002",
      GuardName: "Suresh Patel",
      DeviceType: "Radio",
      Battery: "15%",
      Status: "Battery Low",
      LastCheckIn: "09:45 AM",
    },
    {
      id: 3,
      DeviceID: "GD-1003",
      GuardName: "Amit Sharma",
      DeviceType: "Mobile Device",
      Battery: "0%",
      Status: "Offline",
      LastCheckIn: "Yesterday 10:00 PM",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Guard Device Health Monitor", 14, 10);

    const tableColumn = [
      "Device ID",
      "Guard Name",
      "Device Type",
      "Battery",
      "Status",
      "Last Check-In",
    ];
    const tableRows = tableData.map((row) => [
      row.DeviceID,
      row.GuardName,
      row.DeviceType,
      row.Battery,
      row.Status,
      row.LastCheckIn,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("guard_device_health_monitor.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Guard Devices");
    XLSX.writeFile(wb, "guard_device_health_monitor.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Guard Device Health Monitor</h4>
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

      {/* Device Health Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Device ID</th>
              <th>Guard Name</th>
              <th>Device Type</th>
              <th>Battery</th>
              <th>Status</th>
              <th>Last Check-In</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.DeviceID}</td>
                <td>{row.GuardName}</td>
                <td>{row.DeviceType}</td>
                <td>{row.Battery}</td>
                <td>{row.Status}</td>
                <td>{row.LastCheckIn}</td>
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

export default GuardDeviceHealthMonitor;
