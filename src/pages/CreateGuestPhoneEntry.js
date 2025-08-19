import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./createguestphoneentry.css"; // Create a new CSS file for this component

const SuccessModal = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center py-4">
        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h4 className="mt-3 text-success">Success!</h4>
        <p className="text-muted">{message || "Operation successful."}</p>
      </Modal.Body>
    </Modal>
  );
};

// const ErrorModal = ({ show, handleClose, message }) => {
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Body className="text-center py-4">
//         <div className="success-animation">
//           <svg
//             className="checkmark"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 52 52"
//           >
//             <circle
//               className="checkmark__circle"
//               cx="26"
//               cy="26"
//               r="25"
//               fill="none"
//             />
//             <path
//               className="checkmark__check"
//               fill="none"
//               d="M14.1 27.2l7.1 7.2 16.7-16.8"
//             />
//           </svg>
//         </div>
//         <h4 className="mt-3 text-success">Success!</h4>
//         <p className="text-muted">{message || "Operation successful."}</p>
//       </Modal.Body>
//     </Modal>
//   );
// };
// const AlertModal = ({ show, handleClose, message }) => {
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Body className="text-center py-4">
//         <div className="alert-animation">
//           <svg className="exclamation-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
//             <circle className="exclamation-mark__circle" cx="26" cy="26" r="25" fill="none" />
//             <path className="exclamation-mark__stem" fill="none" d="M26 13 L26 33" />
//             <circle className="exclamation-mark__dot" cx="26" cy="40" r="3" />
//           </svg>
//         </div>
//         <h4 className="mt-3" style={{ color: "#8e44ad" }}>Alert!</h4>
//         <p className="text-muted">{message || "Something went wrong."}</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

const GuestPhoneEntry = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const {
    reservationNumber,
    totalGuests,
    currentGuest = 1,
    verifiedGuests = []
  } = location.state || {};

  const handleSendVerificationLink = (e) => {
  e.preventDefault();

  if (phoneNumber.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  setShowSuccessModal(true);
  setModalMessage("Verification link sent successfully. Redirecting to summary...");

  setTimeout(() => {
    setShowSuccessModal(false);
    navigate("/final-summary", {
      state: {
        reservationNumber,
        totalGuests,
        currentGuest,
        verifiedGuests: [
          ...verifiedGuests,
          {
            guestName: `Guest ${currentGuest}`, // you can replace with actual name input later
            phoneNumber,
            aadhaarStatus: "Awaiting",
            aadhaarTrafficLight: "yellow",
            faceMatchResult: "Awaiting",
            faceTrafficLight: "yellow",
            timestamp: new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      },
    });
  }, 1500);
};
  const handleBack = () => {
    navigate(-1); // Go back to the previous screen (ReservationEntry)
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="header">Guest Verification – Step 1: Phone Number</h2>
        <p className="subheader">
          Verifying guest <b>{currentGuest}</b> of <b>{totalGuests}</b>
        </p>
        <form onSubmit={handleSendVerificationLink}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Guest Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength="10"
              pattern="[0-9]{10}"
              placeholder="9876543210"
              required
            />
          </div>
          <div className="button-group">
            <button type="button" className="secondary-button" onClick={handleBack}>
              Back
            </button>
            <button type="submit" className="primary-button">
              Send Verification Link
            </button>
          </div>
        </form>
      </div>
      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
          message={modalMessage}
        />
      )}
    </div>
  );
};

export default GuestPhoneEntry;