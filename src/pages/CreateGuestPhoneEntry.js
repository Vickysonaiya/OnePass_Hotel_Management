// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import "./createguestphoneentry.css"; // Create a new CSS file for this component

// const SuccessModal = ({ show, handleClose, message }) => {
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

// // const ErrorModal = ({ show, handleClose, message }) => {
// //   return (
// //     <Modal show={show} onHide={handleClose} centered>
// //       <Modal.Body className="text-center py-4">
// //         <div className="success-animation">
// //           <svg
// //             className="checkmark"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 52 52"
// //           >
// //             <circle
// //               className="checkmark__circle"
// //               cx="26"
// //               cy="26"
// //               r="25"
// //               fill="none"
// //             />
// //             <path
// //               className="checkmark__check"
// //               fill="none"
// //               d="M14.1 27.2l7.1 7.2 16.7-16.8"
// //             />
// //           </svg>
// //         </div>
// //         <h4 className="mt-3 text-success">Success!</h4>
// //         <p className="text-muted">{message || "Operation successful."}</p>
// //       </Modal.Body>
// //     </Modal>
// //   );
// // };
// // const AlertModal = ({ show, handleClose, message }) => {
// //   return (
// //     <Modal show={show} onHide={handleClose} centered>
// //       <Modal.Body className="text-center py-4">
// //         <div className="alert-animation">
// //           <svg className="exclamation-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
// //             <circle className="exclamation-mark__circle" cx="26" cy="26" r="25" fill="none" />
// //             <path className="exclamation-mark__stem" fill="none" d="M26 13 L26 33" />
// //             <circle className="exclamation-mark__dot" cx="26" cy="40" r="3" />
// //           </svg>
// //         </div>
// //         <h4 className="mt-3" style={{ color: "#8e44ad" }}>Alert!</h4>
// //         <p className="text-muted">{message || "Something went wrong."}</p>
// //       </Modal.Body>
// //     </Modal>
// //   );
// // };

// const GuestPhoneEntry = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     reservationNumber,
//     totalGuests,
//     currentGuest = 1,
//     verifiedGuests = []
//   } = location.state || {};

//   const handleSendVerificationLink = (e) => {
//   e.preventDefault();

//   if (phoneNumber.length !== 10) {
//     alert("Please enter a valid 10-digit phone number.");
//     return;
//   }

//   setShowSuccessModal(true);
//   setModalMessage("Verification link sent successfully. Redirecting to summary...");

//   setTimeout(() => {
//     setShowSuccessModal(false);
//     navigate("/final-summary", {
//       state: {
//         reservationNumber,
//         totalGuests,
//         currentGuest,
//         verifiedGuests: [
//           ...verifiedGuests,
//           {
//             guestName: `Guest ${currentGuest}`, // you can replace with actual name input later
//             phoneNumber,
//             aadhaarStatus: "Awaiting",
//             aadhaarTrafficLight: "yellow",
//             faceMatchResult: "Awaiting",
//             faceTrafficLight: "yellow",
//             timestamp: new Date().toLocaleString("en-GB", {
//               day: "2-digit",
//               month: "short",
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ],
//       },
//     });
//   }, 1500);
// };
//   const handleBack = () => {
//     navigate(-1); // Go back to the previous screen (ReservationEntry)
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2 className="header">Guest Verification – Step 1: Phone Number</h2>
//         <p className="subheader">
//           Verifying guest <b>{currentGuest}</b> of <b>{totalGuests}</b>
//         </p>
//         <form onSubmit={handleSendVerificationLink}>
//           <div className="form-group">
//             <label htmlFor="phoneNumber">Guest Phone Number *</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               maxLength="10"
//               pattern="[0-9]{10}"
//               placeholder="9876543210"
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="button" className="secondary-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="primary-button">
//               Send Verification Link
//             </button>
//           </div>
//         </form>
//       </div>
//       {showSuccessModal && (
//         <SuccessModal
//           show={showSuccessModal}
//           handleClose={() => setShowSuccessModal(false)}
//           message={modalMessage}
//         />
//       )}
//     </div>
//   );
// };

// export default GuestPhoneEntry;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import "./createguestphoneentry.css";
// import "./finalsummary.css";

// const SuccessModal = ({ show, handleClose, message }) => {
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

// // const ErrorModal = ({ show, handleClose, message }) => {
// //   return (
// //     <Modal show={show} onHide={handleClose} centered>
// //       <Modal.Body className="text-center py-4">
// //         <div className="success-animation">
// //           <svg
// //             className="checkmark"
// //             xmlns="http://www.w3.org/2000/svg"
// //             viewBox="0 0 52 52"
// //           >
// //             <circle
// //               className="checkmark__circle"
// //               cx="26"
// //               cy="26"
// //               r="25"
// //               fill="none"
// //             />
// //             <path
// //               className="checkmark__check"
// //               fill="none"
// //               d="M14.1 27.2l7.1 7.2 16.7-16.8"
// //             />
// //           </svg>
// //         </div>
// //         <h4 className="mt-3 text-success">Success!</h4>
// //         <p className="text-muted">{message || "Operation successful."}</p>
// //       </Modal.Body>
// //     </Modal>
// //   );
// // };
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

// const GuestPhoneEntry = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [verifiedGuests, setVerifiedGuests] = useState([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const {
//     totalGuests,
//   } = location.state || {};

//   const handleSendVerificationLink = (e) => {
//     e.preventDefault();

//     if (verifiedGuests.length >= Number(totalGuests)) {
//       setModalMessage(`You cannot add more than ${totalGuests} guests.`);
//       setShowAlertModal(true);
//       setTimeout(() => setShowAlertModal(false), 1500);
//       return;
//     }

//     if (phoneNumber.length !== 10) {
//       alert("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     const newGuest = {
//       guestName: `Guest ${verifiedGuests.length + 1}`,
//       phoneNumber,
//       aadhaarStatus: "Awaiting",
//       aadhaarTrafficLight: "yellow",
//       faceMatchResult: "Awaiting",
//       faceTrafficLight: "yellow",
//       timestamp: new Date().toLocaleString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       showResend: true,
//     };

//     setVerifiedGuests((prev) => [...prev, newGuest]);
//     // setShowSuccessModal(true);
//     setModalMessage("Verification link sent successfully!");
//     setPhoneNumber("");
//     setTimeout(() => {
//       // setShowSuccessModal(false);
//     }, 1200);
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const [guestStatuses, setGuestStatuses] = useState([]);

//   useEffect(() => {
//     if (verifiedGuests.length > guestStatuses.length) {
//       const newGuest = verifiedGuests[verifiedGuests.length - 1];
//       setGuestStatuses((prev) => [
//         ...prev,
//         {
//           ...newGuest,
//           aadhaarStatus: "Awaiting",
//           aadhaarTrafficLight: "yellow",
//           faceMatchResult: "Awaiting",
//           faceTrafficLight: "yellow",
//           showResend: true,
//         },
//       ]);
//     }
//     if (verifiedGuests.length < guestStatuses.length) {
//       setGuestStatuses((prev) => prev.slice(0, verifiedGuests.length));
//     }
//   }, [verifiedGuests]);

//   useEffect(() => {
//     guestStatuses.forEach((guest, idx) => {
//       if (guest.aadhaarStatus === "Awaiting" && !guest._aadhaarTimerStarted) {
//         setGuestStatuses((prev) => {
//           const updated = [...prev];
//           updated[idx] = { ...updated[idx], _aadhaarTimerStarted: true };
//           return updated;
//         });
//         setTimeout(() => {
//           setGuestStatuses((prev) => {
//             const updated = [...prev];
//             updated[idx] = {
//               ...updated[idx],
//               aadhaarStatus: "Success",
//               aadhaarTrafficLight: "green",
//               showResend: false,
//             };
//             return updated;
//           });
//           setTimeout(() => {
//             setGuestStatuses((prev) => {
//               const updated = [...prev];
//               updated[idx] = {
//                 ...updated[idx],
//                 faceMatchResult: "Success",
//                 faceTrafficLight: "green",
//                 timestamp: new Date().toLocaleString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }),
//               };
//               return updated;
//             });
//           }, 8000);
//         }, 7000);
//       }
//     });
//   }, [guestStatuses]);

//   const allGuestsVerified =
//     guestStatuses.length === totalGuests &&
//     guestStatuses.every(
//       (g) => g.aadhaarStatus === "Success" && g.faceMatchResult === "Success"
//     );

//   const handleConfirmCheckIn = () => {
//     setShowSuccessModal(true);
//     setModalMessage("Reservation check-in complete!");
//     setTimeout(() => {
//       setShowSuccessModal(false);
//       navigate("/");
//     }, 1500);
//   };

//   const handleResendVerification = (idx) => {
//     setGuestStatuses((prev) => {
//       const updated = [...prev];
//       updated[idx] = {
//         ...updated[idx],
//         aadhaarStatus: "Awaiting",
//         aadhaarTrafficLight: "yellow",
//         faceMatchResult: "Awaiting",
//         faceTrafficLight: "yellow",
//         timestamp: "",
//         showResend: true,
//       };
//       return updated;
//     });
//   };

//   const handleRetry = (id) => {
//     setGuestStatuses((prev) => {
//       const updated = [...prev];
//       updated[id] = {
//         ...updated[id],
//         faceMatchResult: "Awaiting",
//         faceTrafficLight: "yellow",
//         timestamp: "",
//         showResend: true,
//       };
//       return updated;
//     });
//   };

//   const handleCancelVerification = () => {
//     if (window.confirm("Are you sure you want to cancel the verification?")) {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h2 className="header">Guest Verification – Step 1: Phone Number</h2>
//         <p className="subheader">
//           Verifying guest <b>{Math.min(verifiedGuests.length + 1, Number(totalGuests))}</b> of <b>{totalGuests}</b>
//         </p>
//         <form onSubmit={handleSendVerificationLink}>
//           <div className="form-group">
//             <label htmlFor="phoneNumber">Guest Phone Number *</label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               maxLength="10"
//               pattern="[0-9]{10}"
//               placeholder="9876543210"
//               required
//             />
//           </div>
//           <div className="button-group">
//             <button type="button" className="secondary-button" onClick={handleBack}>
//               Back
//             </button>
//             <button type="submit" className="primary-button">
//               Verigy Guest
//             </button>
//           </div>
//         </form>
//       </div>

//       {verifiedGuests.length > 0 && (
//         <div className="final-summary-container mt-4">
//           <div className="summary-card">
//             <h2 className="header">Reservation Verification – Progress</h2>
//             <p className="subheader">
//               Verified {verifiedGuests.length} of {totalGuests} guests
//             </p>

//             <div className="table-container">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Guest Name</th>
//                     <th>Phone</th>
//                     <th>Aadhaar Status</th>
//                     {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
//                       <th>Resend Link</th>
//                     )}
//                     <th>Face Match</th>
//                     {guestStatuses.some((g) => g.faceMatchResult !== "Success") && (
//                       <th>Retry FaceMatch</th>
//                     )}
//                     <th>Timestamp</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {guestStatuses.map((guest, index) => (
//                     <tr key={index}>
//                       <td>{guest.guestName}</td>
//                       <td>{guest.phoneNumber}</td>
//                       <td>
//                         <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                           <span
//                             className={`blinking-circle ${guest.aadhaarTrafficLight}`}
//                           />
//                           {guest.aadhaarStatus}
//                         </span>
//                       </td>
//                       {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
//                         <td>
//                           {guest.aadhaarStatus !== "Success" && guest.showResend && (
//                             <button
//                               onClick={() => handleResendVerification(index)}
//                               className="resend-link"
//                             >
//                               Resend Verification
//                             </button>
//                           )}
//                         </td>
//                       )}
//                       <td
//                         style={{ cursor: guest.faceMatchResult === "Awaiting" ? "default" : "default" }}
//                         onClick={() => {
//                           if (guest.faceMatchResult === "Awaiting") {
//                             setGuestStatuses(prev => {
//                               const updated = [...prev];
//                               updated[index] = {
//                                 ...updated[index],
//                                 faceMatchResult: "Success",
//                                 faceTrafficLight: "green",
//                                 timestamp: new Date().toLocaleString("en-GB", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 }),
//                               };
//                               localStorage.setItem("guestStatuses", JSON.stringify(updated));
//                               return updated;
//                             });
//                           }
//                         }}
//                       >
//                         <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                           <span
//                             className={`blinking-circle ${guest.faceTrafficLight}`}
//                           />
//                           {guest.faceMatchResult}
//                         </span>
//                       </td>
//                       {guestStatuses.some((g) => g.faceMatchResult !== "Success") && (
//                         <td>
//                           {guest.faceMatchResult !== "Success" && (
//                             <button
//                               onClick={() => handleRetry(index)}
//                               className="btn btn-primary"
//                             >
//                               Retry FaceMatch
//                             </button>
//                           )}
//                         </td>
//                       )}
//                       <td>{guest.timestamp}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="button-group">
//               <button
//                 type="button"
//                 className="secondary-button"
//                 onClick={handleCancelVerification}
//               >
//                 Cancel Verification
//               </button>
//               <button
//                 type="button"
//                 className="primary-button"
//                 onClick={handleConfirmCheckIn}
//                 disabled={!allGuestsVerified}
//               >
//                 Submit & Confirm Check-In
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showSuccessModal && (
//         <SuccessModal
//           show={showSuccessModal}
//           handleClose={() => setShowSuccessModal(false)}
//           message={modalMessage}
//         />
//       )}
//       <AlertModal
//           show={showAlertModal}
//           handleClose={() => setShowAlertModal(false)}
//           message={modalMessage}
//         />
//     </div>
//   );
// };

// export default GuestPhoneEntry;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./createguestphoneentry.css";
import "./finalsummary.css";

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
const AlertModal = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center py-4">
        <div className="alert-animation">
          <svg className="exclamation-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="exclamation-mark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="exclamation-mark__stem" fill="none" d="M26 13 L26 33" />
            <circle className="exclamation-mark__dot" cx="26" cy="40" r="3" />
          </svg>
        </div>
        <h4 className="mt-3" style={{ color: "#8e44ad" }}>Alert!</h4>
        <p className="text-muted">{message || "Something went wrong."}</p>
      </Modal.Body>
    </Modal>
  );
};

const GuestPhoneEntry = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [showAlertModal, setShowAlertModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [verifiedGuests, setVerifiedGuests] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    totalGuests,
    bookingId,
  } = location.state || {};
  console.log("Total Guests:", bookingId);

  const handleSendVerificationLink = (e) => {
    e.preventDefault();

    if (verifiedGuests.length >= Number(totalGuests)) {
      setModalMessage(`You cannot add more than ${totalGuests} guests.`);
      // setShowAlertModal(true);
      // setTimeout(() => setShowAlertModal(false), 1500);
      return;
    }

    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const newGuest = {
      guestName: `Guest ${verifiedGuests.length + 1}`,
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
      showResend: true,
    };

    setVerifiedGuests((prev) => [...prev, newGuest]);
    setPhoneNumber("");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const [guestStatuses, setGuestStatuses] = useState([]);

  useEffect(() => {
    if (verifiedGuests.length > guestStatuses.length) {
      const newGuest = verifiedGuests[verifiedGuests.length - 1];
      setGuestStatuses((prev) => [
        ...prev,
        {
          ...newGuest,
          aadhaarStatus: "Awaiting",
          aadhaarTrafficLight: "yellow",
          faceMatchResult: "Awaiting",
          faceTrafficLight: "yellow",
          showResend: true,
        },
      ]);
    }
    if (verifiedGuests.length < guestStatuses.length) {
      setGuestStatuses((prev) => prev.slice(0, verifiedGuests.length));
    }
  }, [verifiedGuests]);

  useEffect(() => {
    guestStatuses.forEach((guest, idx) => {
      if (guest.aadhaarStatus === "Awaiting" && !guest._aadhaarTimerStarted) {
        setGuestStatuses((prev) => {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], _aadhaarTimerStarted: true };
          return updated;
        });
        setTimeout(() => {
          setGuestStatuses((prev) => {
            const updated = [...prev];
            if (updated[idx]) { // Check if guest still exists
              updated[idx] = {
                ...updated[idx],
                aadhaarStatus: "Success",
                aadhaarTrafficLight: "green",
                showResend: false,
              };
            }
            return updated;
          });
          setTimeout(() => {
            setGuestStatuses((prev) => {
              const updated = [...prev];
              if (updated[idx]) { // Check if guest still exists
                updated[idx] = {
                  ...updated[idx],
                  faceMatchResult: "Success",
                  faceTrafficLight: "green",
                  timestamp: new Date().toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                };
              }
              return updated;
            });
          }, 8000);
        }, 7000);
      }
    });
  }, [guestStatuses]);

  const allGuestsVerified =
    guestStatuses.length === Number(totalGuests) &&
    guestStatuses.every(
      (g) => g.aadhaarStatus === "Success" && g.faceMatchResult === "Success"
    );

  const handleConfirmCheckIn = () => {
    setShowSuccessModal(true);
    setModalMessage("Booking check-in Successful!");
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/reservation-entry");
    }, 1500);
  };

  const handleResendVerification = (idx) => {
    setGuestStatuses((prev) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        aadhaarStatus: "Awaiting",
        aadhaarTrafficLight: "yellow",
        faceMatchResult: "Awaiting",
        faceTrafficLight: "yellow",
        timestamp: "",
        showResend: true,
      };
      return updated;
    });
  };

  const handleRetry = (id) => {
    setGuestStatuses((prev) => {
      const updated = [...prev];
      updated[id] = {
        ...updated[id],
        faceMatchResult: "Awaiting",
        faceTrafficLight: "yellow",
        timestamp: "",
        showResend: true,
      };
      return updated;
    });
  };

  const handleCancelVerification = () => {
    if (window.confirm("Are you sure you want to cancel the verification?")) {
      navigate("/reservation-entry");
    }
  };

  return (
    <div className="container">
      {verifiedGuests.length < Number(totalGuests) && (
        <div className="card">
          <h2 className="header">Guest Verification – Step 1: Phone Number</h2>
          <p className="subheader">
            Verifying guest <b>{Math.min(verifiedGuests.length + 1, Number(totalGuests))}</b> of <b>{totalGuests}</b>
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
                Verify Guest
              </button>
            </div>
          </form>
        </div>
      )}

      {/* The progress table will show as soon as there's at least one guest */}
      {verifiedGuests.length > 0 && (
        <div className="final-summary-container mt-4">
          <div className="summary-card">
            <h2 className="header">Guest Verification for - {bookingId} </h2>
            <p className="subheader">
              {/* Updated subheader to be more informative */}
              {allGuestsVerified
                ? `All ${totalGuests} guests have been successfully verified!`
                : `Verified ${guestStatuses.filter(g => g.faceMatchResult === 'Success').length} of ${totalGuests} guests`}
            </p>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Guest Name</th>
                    <th>Phone</th>
                    <th>Aadhaar Status</th>
                    {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
                      <th>Resend Link</th>
                    )}
                    <th>Face Match</th>
                    {guestStatuses.some((g) => g.faceMatchResult !== "Success") && (
                      <th>Retry FaceMatch</th>
                    )}
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {guestStatuses.map((guest, index) => (
                    <tr key={index}>
                      <td>{guest.guestName}</td>
                      <td>{guest.phoneNumber}</td>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            className={`blinking-circle ${guest.aadhaarTrafficLight}`}
                          />
                          {guest.aadhaarStatus}
                        </span>
                      </td>
                      {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
                        <td>
                          {guest.aadhaarStatus !== "Success" && guest.showResend && (
                            <button
                              onClick={() => handleResendVerification(index)}
                              className="resend-link"
                            >
                              Resend Verification
                            </button>
                          )}
                        </td>
                      )}
                      <td
                        style={{ cursor: guest.faceMatchResult === "Awaiting" ? "default" : "default" }}
                        onClick={() => {
                          if (guest.faceMatchResult === "Awaiting") {
                            setGuestStatuses(prev => {
                              const updated = [...prev];
                              updated[index] = {
                                ...updated[index],
                                faceMatchResult: "Success",
                                faceTrafficLight: "green",
                                timestamp: new Date().toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }),
                              };
                              localStorage.setItem("guestStatuses", JSON.stringify(updated));
                              return updated;
                            });
                          }
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            className={`blinking-circle ${guest.faceTrafficLight}`}
                          />
                          {guest.faceMatchResult}
                        </span>
                      </td>
                      {guestStatuses.some((g) => g.faceMatchResult !== "Success") && (
                        <td>
                          {guest.faceMatchResult !== "Success" && (
                            <button
                              onClick={() => handleRetry(index)}
                              className="btn btn-primary"
                            >
                              Retry FaceMatch
                            </button>
                          )}
                        </td>
                      )}
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
                className="primary-button"
                onClick={handleConfirmCheckIn}
                disabled={!allGuestsVerified}
              >
                Submit & Confirm Check-In
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
          message={modalMessage}
        />
      )}
      {/* <AlertModal
          show={showAlertModal}
          handleClose={() => setShowAlertModal(false)}
          message={modalMessage}
        /> */}
    </div>
  );
};

export default GuestPhoneEntry;