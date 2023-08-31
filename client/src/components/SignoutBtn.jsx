/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import { apiInstance } from "../api/axiosInstance";
import { API_ENDPOINTS } from "../constants/endpoints";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Signout({ role }) {
  const { clearAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await apiInstance.get(API_ENDPOINTS.SIGNOUT(role));
      localStorage.removeItem("user");
      clearAuthState();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      onClick={() => {
        logout();
      }}
      sx={{
        // border: "1px #0AE4B3 solid",
        color: "#0AE4B3",
        backgroundColor: "white",
        borderColor: "#0AE4B3",
        padding: ".6rem",
        fontWeight: "200",
        marginLeft: "2rem",
        "&:hover": {
          backgroundColor: "#0AE4B3",
          color: "white",
        },
      }}>
      SIGNOUT
    </Button>
  );
}

export default Signout;
