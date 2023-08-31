import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
function RecruiterRoutes() {
  const { authState } = useContext(AuthContext);
  return (
    <>
      {authState?.role === "recruiter" ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
}

export default RecruiterRoutes;
