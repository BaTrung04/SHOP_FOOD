import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth?.login?.currentUser !== null
  );

  const isRole = useSelector(
    (state: RootState) => state.auth?.login?.currentUser?.user?.role
  );

  return (
    <>
      {isLoggedIn && isRole === "admin" ? (
        children
      ) : (
        <Navigate to="/login-admin" />
      )}
    </>
  );
};

export default PrivateRoute;
