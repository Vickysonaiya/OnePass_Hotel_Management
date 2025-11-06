import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CommonTable from "../components/common/Table";
import "./dashboard.css";
import { initialTableData } from "../utils/tableData";
import DateHoursFilter from "../components/DateHoursFilter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const kpis = [
  { title: "Total Properties", value: 42, color: "" },
  {
    title: "Total Check-ins (Current Month)",
    value: 26,
    color: "",
  },
  { title: "Total Credits (Remaining)", value: 2, color: "" },
  {
    title: "Average Credit Consumption per Day",
    value: 1,
    color: "",
  },
];

export default function Dashboard() {
  const [tableData] = useState(initialTableData);
  const [filters] = useState({
    propertyName: "",
    location: "",
    propertyId: "",
    totalRooms: "",
    activeCheckins: "",
  });

  // Table configuration for CommonTable
  const headers = [
    "Property Name",
    "Location",
    "Property ID",
    "Total Rooms",
    "Active Check-ins (Today)",
  ];

  const defaultColumns = [
    { key: "propertyName", label: "Property Name" },
    { key: "location", label: "Location" },
    { key: "propertyId", label: "Property ID" },
    { key: "totalRooms", label: "Total Rooms" },
    { key: "activeCheckins", label: "Active Check-ins (Today)" },
  ];

  // Apply filters
  const filteredData = tableData.filter((item) => {
    return (
      item.propertyName
        .toLowerCase()
        .includes(filters.propertyName.toLowerCase()) &&
      item.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      item.propertyId
        .toLowerCase()
        .includes(filters.propertyId.toLowerCase()) &&
      (filters.totalRooms === "" ||
        item.totalRooms.toString().includes(filters.totalRooms)) &&
      (filters.activeCheckins === "" ||
        item.activeCheckins.toString().includes(filters.activeCheckins))
    );
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Security Command Dashboard</h2>
      </header>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <span className="kpi-icon">{kpi.icon}</span>
            <div>
              <h5>{kpi.title}</h5>
              <span className="kpi-value">{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Properties Overview Table */}
      <div className="table-section">
        <div className="table-header">
          <h3>Properties Overview</h3>
        </div>

        <div>
          <DateHoursFilter />
        </div>
        {/* CommonTable Component */}
        <CommonTable
          headers={headers}
          records={filteredData}
          defaultColumns={defaultColumns}
        />

        <div className="table-footer">
          <div className="table-info">
            Showing {filteredData.length} of {initialTableData.length}{" "}
            properties
          </div>
        </div>
      </div>
    </div>
  );
}
