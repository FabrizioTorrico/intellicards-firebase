import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      console.log("token", token);
      console.log("user", user);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};
