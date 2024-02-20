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
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function SignUpComp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "User",
    phoneNumber: "",
  });

  const { fetchUserData } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trying to login");
    await SignupFunction(formData);
    await fetchUserData();
    router.push("/");
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
            <FormControl fullWidth variant="outlined">
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
              />
            </FormControl>
            <input
              type="submit"
              value={"Sign Up"}
              className={styles.submit__button}
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
