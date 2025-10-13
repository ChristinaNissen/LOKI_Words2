import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";
import image_visual from "../Images/alpaca.jpg";
import ProcessBar from "./ProcessBar.js"; 
import { useLocation } from "react-router-dom";
import VoteContext from "../Contexts/VoteContext";
import { useContext } from "react";

function BallotConfirmation_Picture() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSelectedYes } = useContext(VoteContext);
  // Define the steps for each flow:
  const stepsNo = ["Voted Before", "Voting", "Ballot Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Ballot Confirmation"];

  // Determine which steps array and current step to use.
  // For "No": currentStep is 3.
  // For "Yes": currentStep is 4.
  const steps = userSelectedYes ?  stepsYes :stepsNo;
  const currentStep = userSelectedYes ? 4 : 3;

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />

        <h1>Confirmation</h1>
        <div className="confirmation-desc">
          You have cast your ballot successfully!
        </div>
        <div className="confirmation-desc">
          Below is a visual presentation of your ballot that you have just cast.<br />
          <span>
            This is for your reference only and you need to remember this in the case you want to update your vote.
          </span>
          <br /><br />
          <span>
            <strong>OBS!</strong> For security reasons, you should <u><strong>not</strong></u> share this information with anyone and you should not save this visual presentation anywhere.
          </span>
        </div>

        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={image_visual}
            alt="Visual ballot"
            style={{
              maxWidth: "100%",
              maxHeight: "320px",
            }}
          />
        </div>

        <button className="button" style={{ marginTop: 40 }} onClick={() => navigate("/studyinfo2")}>
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default BallotConfirmation_Picture;

