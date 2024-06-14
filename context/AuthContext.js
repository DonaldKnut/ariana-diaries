import { ProviderId, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  signInWithPopup(auth, ProviderId);
};
