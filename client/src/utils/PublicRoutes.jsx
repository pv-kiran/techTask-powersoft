import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const { authState } = useContext(AuthContext);
  return <>{!authState ? <Outlet></Outlet> : <Navigate to="/"></Navigate>}</>;
}

export default PublicRoutes;
