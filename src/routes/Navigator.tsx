import { Route, Routes } from "react-router-dom";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/SignUp";
import PasswordReset from "../views/auth/PasswordReset";
import Home from "../views/home/Home";

const Navigator = () => {
  //   const { authToken, isExpired } = useAuthToken();

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resetPassword" element={<PasswordReset />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Navigator;
