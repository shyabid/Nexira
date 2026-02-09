import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import PageSpinner from "../components/ui/PageSpinner/PageSpinner";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginUserWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (updates) => {
    return updateProfile(auth.currentUser, updates);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const onSubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        localStorage.setItem("token", user.accessToken);
        setCurrentUser(user);
      } else {
        localStorage.removeItem("token");
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => onSubscribe();
  }, []);

  const authInfo = {
    currentUser,
    createUser,
    loginUser,
    loginUserWithGoogle,
    updateUserProfile,
    logoutUser,
  };

  return (
    <AuthContext value={authInfo}>
      {loading ? <PageSpinner /> : children}
    </AuthContext>
  );
};

export default AuthProvider;
