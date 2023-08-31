import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function CandidateRoutes() {
  const { authState } = useContext(AuthContext);
  return (
    <>
      {authState?.role === "candidate" ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
}

export default CandidateRoutes;
