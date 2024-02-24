"use client";

import React, { useContext, useState } from "react";
import styles from "../login/login.module.css";
import Link from "next/link";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import OAuth from "../oAuth/oAuth";
import { SignupFunction } from "@/fetchData/auth";
import { useRouter } from "next/navigation";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

export default function SignUpComp() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "User",
    phoneNumber: "",
  });

  const { fullName, email, password, role, phoneNumber } = formData;

  // error validsation
  const validateFormData = () => {
    if (!fullName || !email || !password || !phoneNumber) {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
  };

  const formValidation = validateFormData();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  ////

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setEmailValid(true);
    setPasswordValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password before submitting
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid) {
      setEmailValid(false);
    }
    if (!isPasswordValid) {
      setPasswordValid(false);
    }

    if (isEmailValid && isPasswordValid) {
      const res = await SignupFunction(formData);
      if (res.status !== 200) {
        setError(true);
      } else {
        router.push("/verify");
      }
    }
  };

  return (
    <main className={`${styles.main} ${styles.sign_main}`}>
      <Box
        className={styles.content__wrapper}
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid #d28d48 !important",
            borderRadius: "4px",
            bgcolor: "transparent !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #ededf5 ",
            color: "white",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "#d28d48",
            fontSize: "1.1rem",
            fontWeight: "500",
          },
          "& .MuiSvgIcon-root": {
            color: "#ededf5",
          },
          "& .MuiFormControl-root > label": {
            color: "#ededf5",
          },
          ".MuiFormHelperText-root.Mui-error": {
            color: "#8B0000",
          },
          "& .Mui-error > fieldset ": {
            border: "2px solid #8B0000 !important",
          },
        }}
      >
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.logo}>{/* <img src={eye} alt="" /> */}</div>
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.slogan}>
              {"Already have an ccount? "}
              <Link href={"/login"} className={styles.signup__link}>
                Login
              </Link>
            </p>
            {error && (
              <p style={{ color: "red", fontWeight: "800" }}>
                An error occured
              </p>
            )}
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            action=""
            className={styles.form}
            encType="multipart/form-data"
          >
            <TextField
              fullWidth
              id="filled-basic"
              label="FullName"
              variant="outlined"
              name="fullName"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="filled-basic"
              label="Email"
              variant="outlined"
              name="email"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
              error={!emailValid}
              helperText={!emailValid && "Invalid email"}
            />
            <TextField
              fullWidth
              id="filled-basic"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleChange}
            />
            <span>
              <FormControl fullWidth variant="outlined" helperText="hii">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  error={!passwordValid}
                  helperText={"Invalid password"}
                />
              </FormControl>
              {!passwordValid && (
                <p className={styles.error}>
                  Password must be 8 digits, 1 Lowercase, 1 Uppercase, 1 number
                  and 1 special character
                </p>
              )}
            </span>
            <input
              type="submit"
              value={"Sign up"}
              className={`${styles.submit__button} ${
                formValidation === false ? styles.disabled : ""
              }`}
              disabled={formValidation === false}
            />
            <div className={styles.or__hr}>
              <hr />
              <span className={styles.or__wrapper}>or</span>
            </div>
            <div className={styles.oauth}>
              <OAuth />
            </div>
          </form>
        </div>
      </Box>
    </main>
  );
}
