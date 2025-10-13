import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Voting-system.css";
import Footer from "./Footer";
import "./Welcome.css";
import ProcessBar from "./ProcessBar.js"; // Import your progress bar
import Voting from "./Voting"; // Import the Voting component


const VotedBefore = () => {
  const navigate = useNavigate();
  const [userSelectedYes, setUserSelectedYes] = useState(null);

  const handleYes = () => {
    setUserSelectedYes(true);
    console.log("VotedBefore: userSelectedYes set to", true);
    // pass the value using location state
    navigate("/selection", { state: { userSelectedYes: true } });
  };

  const handleNo = () => {
    setUserSelectedYes(false);
    console.log("VotedBefore: userSelectedYes set to", false);
    navigate("/voting", { state: { userSelectedYes: false } });
  };

  const stepsNo = ["Voted Before", "Voting", "Ballot Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Ballot Confirmation"];
  
  console.log("VotedBefore: userSelectedYes =", userSelectedYes);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Welcome!</h1>
        <p className="text-main">
          You have successfully logged in. Please proceed with your voting process below.
        </p>
        <ProcessBar
        steps={userSelectedYes ? stepsYes : stepsNo}
        currentStep={1}
      />
        <div className="card">
          <p className="votedbefore-question">
            Have you voted in this specific election before?
          </p>
          <div className="card-actions">
            <button
              onClick={handleYes}
              className="button"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              className="button"
              type="button"
            >
              No
            </button>
          </div>
        </div>
        <Voting userSelectedYes={userSelectedYes} /> {/* Pass the state as a prop */}
      </main>
      
      <Footer />
    </div>
  );
};

export default VotedBefore;

