import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";
import word from "../Words/Actress.png";
import ProcessBar from "./ProcessBar.js"; 
import { useLocation } from "react-router-dom";
import VoteContext from "../Contexts/VoteContext";
import { useContext, useEffect, useState } from "react";
import { saveVisuaRepresentation, setSessionEnd} from "../API/Voter";

function BallotConfirmationWords2(setIsLoggedIn) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSelectedYes } = useContext(VoteContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Prevent browser back button from leaving confirmation page
    const handlePopState = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.pathname);
    };
    
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Retrieve candidate name from navigation state; fallback if not set.
  const votedCandidate = location.state?.votedCandidate || "Candidate Unknown";

  const now = new Date();
  const dateTime = now.toLocaleString();

  // Define the steps for each flow:
  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Confirmation"];

  // Determine which steps array and current step to use.
  // For "No": currentStep is 3.
  // For "Yes": currentStep is 4.
  const steps = userSelectedYes ?  stepsYes :stepsNo;
  const currentStep = userSelectedYes ? 4 : 3;

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);


  const handleLogout = async () => {
    try {
      await saveVisuaRepresentation({ word });
      await setSessionEnd();
      navigate("/studyinfo2");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setShowLogoutConfirm(false);
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />

          <div className="intro-container">
          <h1 className="intro-title">Confirmation</h1>
          <div className="text-main text-main-confirmation">
            You have cast your ballot succesfully! Below is a visual presentation of your cast ballot. 
          </div>
           <div className="security-box-confirmation">
            <p className="text-small">
              <strong>Why do you need this word?</strong><br />
              This word is a unique visual identifier linked to your voting record. You will need to remember this word from memory if you wish to update your vote later in the election, as it proves your identity and ensures that only you can make changes to your ballot.<br /><br />
              To protect against coercion risks, please take time to memorise this word now. Do not write it down or save it anywhere. Relying on your memory helps keep your vote private and secure.
              <br /><br />
              <a href="/help#ballot-verification-security" className="faq-link">Read more in the FAQ</a>
            </p>
          </div>
        </div>



        <div className="card-wide card-confirmation">
         <h1 className="card-title" style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Word 
          </h1>

            <div
    className="instruction-list"
    style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}
  >
    <ul>
      <li>
        You need to <strong>remember</strong> this word if you want to update your vote later in the election.
      </li>
      <li>
        You should <strong>not share</strong> your word with anyone, and you should <strong>not save</strong> it anywhere.
      </li>
       <li>
        If you forget this card, you will <strong>NOT be able to update your vote</strong> later in the election.
      </li>
    </ul>
  </div>
   <div className="confirmation-card-label" style={{fontWeight: "bold", fontSize: "4rem", marginTop: "40px", marginBottom: "40px", textAlign: "center"}}>
            Actress
          </div>

            <div className="confirmation-info">
              <div className="confirmation-datetime">{dateTime}</div>
              <div className="confirmation-candidate"> {votedCandidate}</div>
            </div>
        
        </div>
        

        <button className="button logout-button-confirmation" style={{marginTop: "40px"}} onClick={() => setShowLogoutConfirm(true)}>
          Logout
        </button>
      {showLogoutConfirm && (
  <div className="modal-backdrop-confirmation">
    <div className="modal-confirmation">
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Are you sure you want to log out?</p>
      <p>
        When you log out, you will not be able to view your card again.<br />
        If you forget your card, you will <strong>NOT be able to update your vote</strong> later in the election.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "8px" }}>
        <button className="button" onClick={handleLogout}>Yes</button>
        <button className="button" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      </main>
      <Footer />
    </div>
  );
}

export default BallotConfirmationWords2;



