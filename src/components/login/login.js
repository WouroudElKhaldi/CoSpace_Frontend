"use client";

import React from "react";
import styles from "./login.module.css";
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

export default function LoginComp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <main className={styles.main}>
      <Box
        className={styles.content__wrapper}
        sx={{
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid black !important",
            borderRadius: "4px",
            bgcolor: "transparent !important",
          },
          "& .MuiInputBase-input .MuiOutlinedInput-input >  *": {
            color: "#ededf5 !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #ededf5 ",
          },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "black",
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
            <h1 className={styles.title}>Log in to your account</h1>
            <p className={styles.slogan}>
              {"Don't have an ccount? "}
              <Link href={"/signup"} className={styles.signup__link}>
                Sign up
              </Link>
            </p>
          </div>
          <form
            onSubmit={() => console.log("submitted")}
            action=""
            className={styles.form}
            encType="multipart/form-data"
          >
            <TextField
              fullWidth
              id="filled-basic"
              label="Email"
              variant="outlined"
              name="email"
              sx={{
                fontFamily: "Arial !important",
              }}
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
              />
            </FormControl>
            <input
              type="submit"
              value={"Log in"}
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
