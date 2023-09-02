/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import svg from "/pngwing.com.png";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { uninterceptedApiInstance } from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../constants/endpoints";
import { AuthContext } from "../../context/AuthProvider";

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

function Form({ formType }) {
  const [isCandidate, setIsDoctor] = useState(true);
  const { setAuthState } = useContext(AuthContext);

  const [error, setError] = useState(null);

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
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  let newErrors = { email: "", password: "", name: "", mobile: "" };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression to check for valid email format
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };
  const validateMobile = (mobile) => {
    // Regular expression to check for valid 10-digit mobile number format
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (formType === "signup") {
      if (user.name.length < 5) {
        newErrors.name = "Name must be at least 5 characters";
        isValid = false;
      }

      if (/\d/.test(user.name)) {
        newErrors.name = "Name must not include numbers";
        isValid = false;
      }

      if (!validateMobile(user.mobile)) {
        newErrors.mobile = "Invalid mobile number";
        isValid = false;
      }
    }

    if (!validateEmail(user.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (
      !/[a-zA-Z]/.test(user.password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.password)
    ) {
      newErrors.password =
        "Password must include a character and a special character";
      isValid = false;
    }

    if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(newErrors);

    if (isValid) {
      const role = isCandidate ? "candidate" : "recruiter";
      if (formType === "signup") {
        try {
          const { data } = await uninterceptedApiInstance.post(
            API_ENDPOINTS.SIGNUP(role),
            user
          );
          navigate("/signin");
        } catch (err) {
          const { response } = err;
          setError(response.data.message);
        }
      } else {
        try {
          console.log("HEllo SIGNIN");
          const { data } = await uninterceptedApiInstance.post(
            API_ENDPOINTS.SIGNIN(role),
            user
          );
          console.log("HEllo");
          localStorage.setItem("user", JSON.stringify(data.user));
          setAuthState();
        } catch (err) {
          const { response } = err;
          console.log(response.data.message);
          setError(response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

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
                ? `Candidate ${
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
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
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
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
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
              error={Boolean(formErrors.mobile)}
              helperText={formErrors.mobile}
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
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
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
        {error && (
          <Typography
            sx={{
              marginLeft: "2rem",
              color: "red",
              textAlign: "center",
            }}>
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Form;
