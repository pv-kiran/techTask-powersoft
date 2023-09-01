/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import svg from "/pngwing.com.png";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Welcome() {
  const { authState } = useContext(AuthContext);
  return (
    <div
      style={{
        marginTop: "5rem",
        height: "80vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <img src={svg} alt="landing" style={{ width: "30%" }} />
      {authState ? (
        authState.role === "candidate" ? (
          <Button
            variant="contained"
            sx={{
              marginTop: "2rem",
              backgroundColor: "#42F5B9",
              padding: ".5rem",
              "&:hover": { backgroundColor: "green" },
            }}
            component={Link}
            to="/schedule/view">
            View Schedules
          </Button>
        ) : (
          <Button
            component={Link}
            to="/scheduling"
            sx={{
              marginTop: "2rem",
              padding: ".5rem 1rem",
              color: "#fff",
              backgroundColor: "#42F5B9",
              "&:hover": { backgroundColor: "green" },
            }}>
            Start Scheduling
          </Button>
        )
      ) : (
        <Typography
          variant="h4"
          sx={{
            marginTop: "2rem",
            color: "#42F5B9",
            textAlign: "center",
          }}>
          Let's Schedule ..!
        </Typography>
      )}
    </div>
  );
}

export default Welcome;
