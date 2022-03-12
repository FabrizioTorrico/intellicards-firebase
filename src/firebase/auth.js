import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./index";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getUserData } from "./firestore";
import { useRouter } from "next/router";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      // const token = await user.getIdToken();
      setCurrentUser(user);
      setCurrentUserData(await getUserData(user.uid));
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, currentUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const loginWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).catch((error) =>
    console.log(error)
  );
};

export const logout = () => signOut(auth);
