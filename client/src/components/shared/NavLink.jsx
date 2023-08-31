/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
function NavLink({ text, path }) {
  return (
    <Button
      component={Link}
      to={path}
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
      {text}
    </Button>
  );
}

export default NavLink;
