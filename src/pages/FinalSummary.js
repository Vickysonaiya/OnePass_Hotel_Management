// src/pages/FinalSummary.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./finalsummary.css"; // Create this CSS file

const FinalSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve data from location state. For a complete flow, this would
  // be an array of all verified guests. We will use mock data for demonstration.
  const {
    expectedAdults = 2,
    expectedDependents = 1,
    verifiedGuests = [
      {
        guestName: "John Doe",
        phoneNumber: "9876543210",
        aadhaarStatus: "Verified",
        faceMatchResult: "Success",
        dependentsLinked: 1,
        timestamp: "18:05:00",
      },
      {
        guestName: "Jane Doe",
        phoneNumber: "9876543211",
        aadhaarStatus: "Verified",
        faceMatchResult: "Success",
        dependentsLinked: 0,
        timestamp: "18:10:00",
      },
    ],
  } = location.state || {};

  const totalVerifiedAdults = verifiedGuests.length;
  const totalVerifiedDependents = verifiedGuests.reduce(
    (acc, guest) => acc + guest.dependentsLinked,
    0
  );

  const isGuestCountMatched =
    totalVerifiedAdults === expectedAdults &&
    totalVerifiedDependents === expectedDependents;

  const handleConfirmCheckIn = () => {
    // Primary CTA - Finalizes the check-in session.
    // In a real application, this would be a final API call to mark the
    // reservation as 'checked-in' in your system.
    console.log("Check-in confirmed. Finalizing reservation.");
    alert("Reservation check-in is now complete!");
    navigate("/"); // Navigate back to the dashboard or a confirmation page
  };

  const handleBackToAddGuests = () => {
    // Secondary CTA - Return to Screen 2 to add more guests.
    navigate("/guest-phone-entry");
  };

  const handleCancelVerification = () => {
    // Fallback CTA - Aborts the entire process.
    if (window.confirm("Are you sure you want to cancel the verification?")) {
      console.log("Verification process cancelled.");
      navigate("/");
    }
  };

  return (
    <div className="final-summary-container">
      <div className="summary-card">
        <h2 className="header">Reservation Verification – Complete</h2>
        <p className="subheader">All guests for this reservation have been verified.</p>

        {!isGuestCountMatched && (
          <div className="alert-box alert-mismatch">
            <p>
              <strong>Verification incomplete.</strong>{" "}
              {expectedAdults - totalVerifiedAdults > 0
                ? `${expectedAdults - totalVerifiedAdults} adult(s) `
                : ""}
              {expectedDependents - totalVerifiedDependents > 0
                ? `${
                    expectedDependents - totalVerifiedDependents
                  } dependent(s) `
                : ""}
              remaining.
            </p>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Phone</th>
                <th>Aadhaar Status</th>
                <th>Face Match Result</th>
                <th>Dependents Linked</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {verifiedGuests.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.guestName}</td>
                  <td>{guest.phoneNumber}</td>
                  <td>{guest.aadhaarStatus}</td>
                  <td>{guest.faceMatchResult}</td>
                  <td>{guest.dependentsLinked}</td>
                  <td>{guest.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancelVerification}
          >
            Cancel Verification
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={handleBackToAddGuests}
          >
            Back to Add More Guests
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={handleConfirmCheckIn}
            disabled={!isGuestCountMatched}
          >
            Submit & Confirm Check-In
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalSummary;