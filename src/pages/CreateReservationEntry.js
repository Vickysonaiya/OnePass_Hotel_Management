// src/pages/ReservationEntry.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createreservationentry.css"; // We'll create this CSS file

const ReservationEntry = () => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [adults, setAdults] = useState("");
  const navigate = useNavigate();

  const handleStartVerification = (e) => {
    e.preventDefault();

    if (!reservationNumber || !adults) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const totalGuests = parseInt(adults, 10)
    // Store totalGuests in localStorage
    localStorage.setItem('totalGuests', totalGuests);
    console.log(`Total expected guests: ${totalGuests}`);
    console.log(`Verification session initiated for reservation: ${reservationNumber}`);
    
    navigate("/guest-phone-entry", { 
  state: { 
    reservationNumber, 
    adults: parseInt(adults, 10),
    totalGuests,
    currentGuest: 1   // start from first guest
  }
    });
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the Dashboard
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="header">Guest Check-In Verification</h2>
        <p className="subheader">Enter reservation details to begin verification.</p>
        <form onSubmit={handleStartVerification}>
          <div className="form-group">
            <label htmlFor="reservationNumber">Reservation Number *</label>
            <input
              type="text"
              id="reservationNumber"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adults">Number of Guests *</label>
            <input
              type="number"
              id="adults"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="button-group">
            <button type="button" className="secondary-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Verify Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationEntry;