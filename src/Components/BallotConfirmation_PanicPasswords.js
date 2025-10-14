import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";

const BallotConfirmationSimple = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Confirmation</h1>
        <div className="confirmation-desc">
          You have cast your ballot succesfully!
        </div>
        <button
          className="button"
          style={{ marginTop: 40 }}
          onClick={() => navigate("/welcome")}
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default BallotConfirmationSimple;

