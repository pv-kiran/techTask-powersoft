/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import svg from "../../../public/pngwing.com.png";

import { useState } from "react";

import { Link } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#0AE4B3",
  fontsize: "2rem",
  marginTop: "-3rem",
  borderRadius: "5px",
  padding: ".8rem",
  position: "relative",
  color: "white",
  letterSpacing: "2px",
  "&:hover": {
    backgroundColor: "#2CE1FE",
  },
}));

function UserForm({ formType }) {
  const [isCandidate, setIsDoctor] = useState(true);

  const formData =
    formType === "signup"
      ? {
          name: "",
          email: "",
          mobile: "",
          password: "",
        }
      : {
          email: "",
          password: "",
        };

  const [user, setUser] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <Grid
      container
      sx={{
        height: "78vh",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "6rem",
      }}
      spacing={1}>
      <Grid
        item
        sx={{
          display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: { lg: "30rem", md: "50%" },
        }}>
        <Box sx={{ textAlign: "center", marginLeft: "-2rem" }}>
          <img src={svg} style={{ width: "25rem", height: "25rem" }} alt="" />
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          width: { lg: "30rem", md: "50%" },
        }}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "75px",
            borderRadius: "5px",
            padding: "1.5rem",
            width: { lg: "100%", md: "100%", sm: "20rem" },
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "-3rem",
            }}>
            <Typography
              // variant='h6'
              sx={{
                color: "#0AE4B3",
                fontSize: { lg: "1.6rem", md: "1rem", sm: ".9rem" },
              }}>
              {isCandidate
                ? `Cadidate ${
                    formType.charAt(0).toUpperCase() + formType.slice(1)
                  }`
                : `Recruiter ${
                    formType.charAt(0).toUpperCase() + formType.slice(1)
                  }`}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "1rem", md: "1rem", sm: ".7rem" },
                color: "#2CE1FE",
                paddingTop: { lg: ".6rem", md: ".5rem", sm: ".2rem" },
                cursor: "pointer",
              }}
              onClick={() => setIsDoctor(!isCandidate)}>
              {isCandidate ? "Are you a recruiter ?" : "Not a recruiter ?"}
            </Typography>
          </Box>
          {formType === "signup" && (
            <TextField
              // id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{
                width: "100%",
                height: ".6rem",
              }}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          )}
          <TextField
            // id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{
              width: "100%",
              height: ".6rem",
            }}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {formType === "signup" && (
            <TextField
              // id="outlined-basic"
              label="Mobile"
              variant="outlined"
              sx={{
                width: "100%",
                height: ".6rem",
              }}
              name="mobile"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          )}
          <TextField
            // id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{
              width: "100%",
              height: ".6rem",
            }}
            name="password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}>
            <Typography
              sx={{
                fontSize: { lg: "1rem", md: ".8rem", sm: ".8rem" },
                cursor: "pointer",
                textDecoration: "none",
                color: "#2CE1FE",
                marginTop: "-1rem",
                marginBottom: "-1.3rem",
                "&:hover": {
                  color: "#0AE4B3",
                },
              }}
              component={Link}
              to={`/${formType === "signup" ? "signin" : "signup"}`}>
              {formType === "signup"
                ? "Alreay have an account ?"
                : "Don't have an account ? Signup"}
            </Typography>
          </Box>
          <ColorButton type="submit">{formType.toUpperCase()}</ColorButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserForm;
