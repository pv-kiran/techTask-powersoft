import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import NavLink from "./shared/NavLink";
import Signout from "./SignoutBtn";

function Navbar() {
  const { authState } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={1}
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#42f5b9",
          padding: ".3rem",
        }}>
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            SCHEDULER
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {authState ? (
            authState.role === "recruiter" ? (
              <>
                <NavLink text={"Scheduling"} path={"/scheduling"} />
                <Signout role={authState?.role} />
              </>
            ) : (
              <>
                <NavLink text={"Booking"} path={"/schedule/book"} />
                <NavLink text={"Appointments"} path={"/schedule/view"} />
                <Signout role={authState?.role} />
              </>
            )
          ) : (
            <NavLink text={"Signup / Signin"} path={"/signin"} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
