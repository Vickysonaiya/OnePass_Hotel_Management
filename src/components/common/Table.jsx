import React from 'react'
import { Table } from "react-bootstrap";
import { format } from "date-fns";

/**
 * CommonTable
 * Props:
 * - columns: optional array [{ key, label, render?(record) }]
 * - headers: legacy; if columns not provided, headers are used as labels and matched to default keys
 * - records: array of record objects
 * - handleShowDetails: function(record) to show details (optional)
 * - maskPhone: function to mask phone numbers (optional)
 */
const CommonTable = ({ columns, headers = [], records = [], handleShowDetails, maskPhone,defaultColumns }) => {
console.log("Default Columns in Table:",records);
  // Default column mapping (used when no columns prop supplied)

  // Build effective columns: priority -> columns prop, else attempt to build from headers, else defaultColumns
  let effectiveColumns = columns && columns.length ? columns : null;
  if (!effectiveColumns) {
    if (headers && headers.length) {
      // try to align headers with default keys by position
      effectiveColumns = headers.map((h, idx) => {
        const def = defaultColumns[idx];
        return { key: def ? def.key : h.toLowerCase().replace(/\s+/g, ''), label: h };
      });
    } else {
      effectiveColumns = defaultColumns;
    }
  }

  const renderValue = (record, col) => {
    if (col.render) return col.render(record);

    const key = col.key;
    // details pseudo-key
    if (key === 'details') {
      if (!handleShowDetails) return '';
      return (
        <span
          style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'none', fontSize: 14 }}
          onClick={() => handleShowDetails(record)}
        >
          View Details
        </span>
      );
    }

    // tolerant access: try exact, lowercase, camelCase
    let val = record[key];
    if (val === undefined) val = record[key.toLowerCase()];
    if (val === undefined && key && key.length > 1) {
      const alt = key.charAt(0).toLowerCase() + key.slice(1);
      val = record[alt];
    }

    if (val === undefined || val === null) return '';

    const lowerKey = key.toLowerCase();
    // Date formatting heuristics
    if (lowerKey.includes('check') || lowerKey.includes('date') || val instanceof Date) {
      try {
        const d = new Date(val);
        if (!isNaN(d)) return format(d, 'd MMM yy, h:mm a');
      } catch (e) {
        // fallthrough
      }
    }

    // Phone masking
    if (lowerKey.includes('phone') && maskPhone) return maskPhone(val);

    // Verification display: emulate existing badge logic
    if (lowerKey === 'verification' || lowerKey.includes('verify')) {
      const verification = record.verification || record.verificationType || '';
      const faceMatch = record.faceMatch || record.faceID || record.faceMatchStatus;
      if (verification === 'Aadhaar' && faceMatch === 'Match') {
        return (
          <span className="d-flex align-items-center gap-1">
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: 'green' }} />
            Aadhaar + Face ID
          </span>
        );
      }
      return (
        <span className="d-flex align-items-center gap-1">
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: 'orange' }} />
          Manual Verification
        </span>
      );
    }

    // Default
    return String(val);
  };

  return (
    <div>
      <div className="table-responsive custom-table-wrapper">
        <Table hover className="guest-table align-middle">
          <thead>
            <tr>
              {effectiveColumns.map((col, idx) => (
                <th key={idx}>{col.label || ''}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records?.map((r, i) => (
              <tr key={i}>
                {effectiveColumns.map((col, ci) => (
                  <td key={ci}>{renderValue(r, col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CommonTable