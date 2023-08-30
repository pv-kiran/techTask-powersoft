import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Navbar() {
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
            Scheduler
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            component={Link}
            to="/signin"
            sx={{
              border: "1px #0AE4B3 solid",
              color: "#0AE4B3",
              backgroundColor: "white",
              borderColor: "#0AE4B3",
              padding: ".6rem",
              fontWeight: "200",
              "&:hover": {
                backgroundColor: "#0AE4B3",
                color: "white",
              },
            }}>
            Sign up / Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
