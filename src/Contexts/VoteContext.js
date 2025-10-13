import { createContext } from "react";

const VoteContext = createContext({
  userSelectedYes: false,
  setUserSelectedYes: () => {}
});

export default VoteContext;