import Parse from "parse";

export async function addVoter(ID, password) {
  if (!ID || !password) {
    throw new Error("ID and password are required");
  }
  await Parse.User.logOut();
  let user = new Parse.User();
  user.set("username", ID);
  user.set("password", password);
  user.set("Candidate", "");
  user.set("BallotSelection", "");
  try {
    await user.signUp();
  } catch (err) {
    console.error("addVoter error:", err, err.name, err.message, err.code);
    if (err.xhr) console.error("err.xhr:", err.xhr);
    if (err.rawResponse) console.error("rawResponse:", err.rawResponse);
    throw err;
  }
}

export async function loginVoter(ID, password) {
  await Parse.User.logOut();
  await Parse.User.logIn(ID, password);
}

export async function logoutVoter(){
    await Parse.User.logOut();
}

export default function getCurrentUser() {
  let currentUser = Parse.User.current();
  return currentUser;
}


export async function saveVote(vote) {
  const Voter = getCurrentUser();
  Voter.set("Candidate", vote);
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving vote: " + error);
  }
}

export async function saveBallotSelections(ballotSelections) {
  const Voter = getCurrentUser();
  Voter.set("Ballot_Selections", ballotSelections);
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving ballot selections: " + error);
  }
}
