import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";
// import ScholarshipData from "../Hooks/ScholarshipData/ScholarshipData";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("isDarkMode")) || false;
  });

  // Authentication State
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Create User With email and pass
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Login user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Update User
  const updateUserProfile = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  // Social Login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Log Out
  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  // const scholarships = ScholarshipData();

  // Sync isDarkMode with localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Firebase Authentication Listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);

    });

    return () => {
      unSubscribe();
    };
  }, []);

  const userInfo = {
    isDarkMode,
    setIsDarkMode,
    loading,
    setLoading,
    user,
    setUser,
    googleLogin,
    userLogOut,
    createUser,
    updateUserProfile,
    loginUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
