import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./index";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getUserData } from "./firestore";
import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import DisconnectedPage from "../components/index/DisconnectedPage";
import CompleteLogin from "../components/index/CompleteLogin";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      // const token = await user.getIdToken();
      setCurrentUser(user);
      console.log(user);
      setCurrentUserData(await getUserData(user.uid));
      setLoading(false);
    });
  }, []);

  function PageToRender() {
    if (!currentUserData)
      return (
        <Layout>
          {currentUser ? <CompleteLogin /> : <DisconnectedPage />}
        </Layout>
      );
    else return children;
  }

  return (
    <AuthContext.Provider value={{ currentUser, currentUserData }}>
      <PageToRender />
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
