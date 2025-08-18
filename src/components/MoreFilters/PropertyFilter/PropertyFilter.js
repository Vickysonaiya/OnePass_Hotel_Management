import React, { useState, useRef, useEffect } from "react";
import "./PropertyFilter.css"; // ✅ Reusing same CSS

const PropertyFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([
    "Property 1",
    "Property 2",
    "Property 3",
    "Property 4",
  ]);
  const [options] = useState([
    "Property 1",
    "Property 2",
    "Property 3",
    "Property 4",
  ]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackClick = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (property) => {
    setSelectedProperties((prev) =>
      prev.includes(property)
        ? prev.filter((p) => p !== property)
        : [...prev, property]
    );
  };

  const handleApply = () => {
    console.log("Applied Property Filters:", selectedProperties);
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
        Property Filter
      </button>

      {isOpen && (
        <div className="unit-filter-dropdown">
          {/* <h4>Filter by Property</h4> */}
          <div className="filter-header">
            <button className="back-btn" onClick={handleBackClick}>
              ←
            </button>
            <h4>Filter by Dispute status</h4>
          </div>
          {options.map((property) => (
            <label key={property} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedProperties.includes(property)}
                onChange={() => handleCheckboxChange(property)}
              />
              <span>{property}</span>
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

export default PropertyFilter;
