import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const authProvider = ({ children }) => {
  // DarkMode Impelment
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("isDarkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  const userInfo = {
    isDarkMode,
    setIsDarkMode,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default authProvider;
