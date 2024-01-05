import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import PasswordReset from "../views/auth/PasswordReset";
import Home from "../views/home/Home";
import useAuthToken from "../hooks/auth/useAuthToken";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const Private: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authToken, isExpired } = useAuthToken();

  if (authToken && !isExpired) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" />;
  }
};

const Navigator = () => {

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resetPassword" element={<PasswordReset />} />
      <Route
        path="/"
        element={<Private children={<Home/>}/>} />
    </Routes>
  );
};

export default Navigator;
