import React, { useState, useRef, useEffect } from "react";
import "./DeskFilter.css"; // ✅ Reuse same styling

const DeskFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDesks, setSelectedDesks] = useState([
    "Desk 1",
    "Desk 2",
    "Desk 3",
    "Desk 4",
  ]);
  const [options] = useState(["Desk 1", "Desk 2", "Desk 3", "Desk 4"]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackClick = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (desk) => {
    setSelectedDesks((prev) =>
      prev.includes(desk) ? prev.filter((d) => d !== desk) : [...prev, desk]
    );
  };

  const handleApply = () => {
    console.log("Applied Desk Filters:", selectedDesks);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="unit-filter-container" ref={dropdownRef}>
      <button className="unit-filter-btn" onClick={toggleDropdown}>
        Desk Filter
      </button>

      {isOpen && (
        <div className="unit-filter-dropdown">
          {/* <h4>Filter by Desk</h4> */}
          <div className="filter-header">
            <button className="back-btn" onClick={handleBackClick}>
              ←
            </button>
            <h4>Filter by Dispute status</h4>
          </div>
          {options.map((desk) => (
            <label key={desk} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedDesks.includes(desk)}
                onChange={() => handleCheckboxChange(desk)}
              />
              <span>{desk}</span>
            </label>
          ))}
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DeskFilter;
