import React, { useContext } from "react";
import { AuthContext } from "../Provider/authProvider";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;
