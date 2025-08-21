// // src/pages/ReservationEntry.js

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./createreservationentry.css"; // We'll create this CSS file

// const ReservationEntry = () => {
//   const [reservationNumber, setReservationNumber] = useState("");
//   const [adults, setAdults] = useState("");
//   const navigate = useNavigate();

//   const handleStartVerification = (e) => {
//     e.preventDefault();

//     if (!reservationNumber || !adults) {
//       alert("Please fill in all mandatory fields.");
//       return;
//     }

//     const totalGuests = parseInt(adults, 10)
//     // Store totalGuests in localStorage
//     localStorage.setItem('totalGuests', totalGuests);
//     console.log(`Total expected guests: ${totalGuests}`);
//     console.log(`Verification session initiated for reservation: ${reservationNumber}`);
    
//     navigate("/guest-phone-entry", { 
//   state: { 
//     reservationNumber, 
//     adults: parseInt(adults, 10),
//     totalGuests,
//     currentGuest: 1   // start from first guest
//   }
//     });
//   };

//   const handleCancel = () => {
//     navigate("/"); // Navigate back to the Dashboard
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2 className="header">Guest Check-In Verification</h2>
//         <p className="subheader">Enter reservation details to begin verification.</p>
//         <form onSubmit={handleStartVerification}>
//           <div className="form-group">
//             <label htmlFor="reservationNumber">Reservation Number *</label>
//             <input
//               type="text"
//               id="reservationNumber"
//               value={reservationNumber}
//               onChange={(e) => setReservationNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="adults">Number of Guests *</label>
//             <input
//               type="number"
//               id="adults"
//               value={adults}
//               onChange={(e) => setAdults(e.target.value)}
//               min="1"
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="button" className="secondary-button" onClick={handleCancel}>
//               Cancel
//             </button>
//             <button type="submit" className="primary-button">
//               Verify Guest
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReservationEntry;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./createreservationentry.css";

// const ReservationEntry = () => {
//   const [reservationNumber, setReservationNumber] = useState("");
//   const [adults, setAdults] = useState("");
//   const navigate = useNavigate();

//   const reservationList = [
//     { reservationNumber: "RSV123", guests: 2 },
//     { reservationNumber: "RSV456", guests: 4 },
//     { reservationNumber: "RSV789", guests: 3 },
//     { reservationNumber: "RSV101", guests: 4 },
//     { reservationNumber: "RSV101", guests: 3 },
//     { reservationNumber: "RSV101", guests: 1 },
//     { reservationNumber: "RSV101", guests: 2 },
//     { reservationNumber: "RSV101", guests: 4 },
//     { reservationNumber: "RSV101", guests: 2 },
//     { reservationNumber: "RSV101", guests: 1 },
//     { reservationNumber: "RSV101", guests: 2 },
//     { reservationNumber: "RSV101", guests: 1 },
//     { reservationNumber: "RSV101", guests: 3 },
//   ];

//   const handleStartVerification = (e) => {
//     e.preventDefault();

//     if (!reservationNumber || !adults) {
//       alert("Please fill in all mandatory fields.");
//       return;
//     }

//     const totalGuests = parseInt(adults, 10);
//     localStorage.setItem("totalGuests", totalGuests);

//     navigate("/guest-phone-entry", {
//       state: {
//         reservationNumber,
//         adults: parseInt(adults, 10),
//         totalGuests,
//         currentGuest: 1,
//       },
//     });
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };

//   const handleSelectReservation = (reservation) => {
//     setReservationNumber(reservation.reservationNumber);
//     setAdults(reservation.guests);
//   };

//   return (
//     <div className="reservation-entry-container">
//       <div className="card form-card">
//         <h2 className="header">Guest Check-In Verification</h2>
//         <p className="subheader">Enter reservation details to begin verification.</p>
//         <form onSubmit={handleStartVerification}>
//           <div className="form-group">
//             <label htmlFor="reservationNumber">Reservation Number *</label>
//             <input
//               type="text"
//               id="reservationNumber"
//               value={reservationNumber}
//               onChange={(e) => setReservationNumber(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="adults">Number of Guests *</label>
//             <input
//               type="number"
//               id="adults"
//               value={adults}
//               onChange={(e) => setAdults(e.target.value)}
//               min="1"
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button
//               type="button"
//               className="secondary-button"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="primary-button">
//               Next
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Reservation List Section */}
//       <div className="card reservation-list">
//         <h3>Reservation List</h3>
//         <ul>
//           {reservationList.map((res) => (
//             <li
//               key={res.reservationNumber}
//               onClick={() => handleSelectReservation(res)}
//               className="reservation-item"
//             >
//               <span className="res-number">{res.reservationNumber}</span>
//               <span className="res-guests">{res.guests} Guests</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ReservationEntry;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createreservationentry.css";

const ReservationEntry = () => {
  const [bookingId, setBookingID] = useState("");
  const [adults, setAdults] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const BookingIDList = [
  { id: 1, bookingId: "VVQ23001", guests: 2 },
  { id: 2, bookingId: "VVQ23002", guests: 4 },
  { id: 3, bookingId: "VVQ23003", guests: 3 },
  { id: 4, bookingId: "VVQ23004", guests: 4 },
  { id: 5, bookingId: "VVQ23005", guests: 3 },
  { id: 6, bookingId: "VVQ23006", guests: 1 },
  { id: 7, bookingId: "VVQ23007", guests: 2 },
  { id: 8, bookingId: "VVQ23008", guests: 4 },
  { id: 9, bookingId: "VVQ23009", guests: 2 },
  { id: 10, bookingId: "VVQ23010", guests: 1 },
  { id: 11, bookingId: "VVQ23011", guests: 2 },
  { id: 12, bookingId: "VVQ23012", guests: 1 },
  { id: 13, bookingId: "VVQ23013", guests: 3 },
  ];

  const handleStartVerification = (e) => {
    e.preventDefault();

    if (!bookingId || !adults) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const totalGuests = parseInt(adults, 10);
    localStorage.setItem("totalGuests", totalGuests);

    navigate("/guest-phone-entry", {
      state: {
        bookingId,
        adults: parseInt(adults, 10),
        totalGuests,
        currentGuest: 1,
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  // Deprecated, but keeping it in case you want the side list functionality as well
  const handleSelectReservation = (reservation) => {
    setBookingID(reservation.bookingId);
    setAdults(reservation.guests.toString());
  };

  // New handler for selecting from the modal
  const handleSelectFromModal = (reservation) => {
    setBookingID(reservation.bookingId);
    setAdults(reservation.guests.toString()); // Input values should be strings
    setIsModalOpen(false); // Close the modal after selection
    setSearchTerm(""); // Reset search term
  };

  // Filter reservations based on search term for the modal
  const filteredReservations = BookingIDList.filter((res) =>
    res.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="reservation-entry-container">
        <div className="card form-card">
          <h2 className="header">Guest Check-In Verification</h2>
          <p className="subheader">
            Enter booking details to begin verification.
          </p>
          <form onSubmit={handleStartVerification}>
            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="bookingId">Booking ID *</label>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Today's Bookings
                </button>
              </div>
              <input
                type="text"
                id="bookingId"
                value={bookingId}
                onChange={(e) => setBookingID(e.target.value)}
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
              <button
                type="button"
                className="secondary-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Reservation List Section (Side Panel) */}
        <div className="card reservation-list">
          <h3>Booking List</h3>
          <ul>
            {BookingIDList.map((res) => (
              <li
                key={res.id} // Using the new unique ID for the key
                onClick={() => handleSelectReservation(res)}
                className="reservation-item"
              >
                <span className="res-number">{res.bookingId}</span>
                <span className="res-guests">{res.guests} Guests</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reservation List Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Today's Bookings</h3>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search by Booking ID..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="modal-reservation-list">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <li key={res.id} onClick={() => handleSelectFromModal(res)}>
                    <span className="res-number">{res.bookingId}</span>
                    <span className="res-guests">{res.guests} Guests</span>
                  </li>
                ))
              ) : (
                <li className="no-results">No bookings found.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationEntry;