"use client";

import styles from "../login/login.module.css";
import { useContext, useState } from "react";
import { Box, TextField, Link } from "@mui/material";
import { VerifyFunction } from "@/fetchData/auth";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

const VerifyComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const router = useRouter();
  const { fetchUserData } = useContext(AuthContext);
  const [code, setCode] = useState(Array(8).fill(""));
  const [error, setError] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [codeValid, setCodeValid] = useState(false);

  const handleChange = (index) => (event) => {
    const { value } = event.target;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setFormData((prevFormData) => ({
      ...prevFormData,
      code: newCode.join(""),
    }));
    setCodeValid(
      newCode.join("").length === 8 && /[a-zA-Z]/.test(newCode.join(""))
    );
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: value,
    }));
    setEmailValid(validateEmail(value));
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trying to verify");
    // Perform validation before submission
    if (emailValid && codeValid) {
      const res = await VerifyFunction(formData);
      await fetchUserData();
      if (res.status !== 200) {
        setError(true);
      } else {
        router.push("/");
      }
    } else {
      alert("Please fill in the form correctly.");
    }
  };

  return (
    <main className={styles.main}>
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
          "& .MuiInputLabel-root": {
            color: "#ededf5",
          },
        }}
      >
        <div className={styles.content}>
          <div className={styles.info}>
            <h1 className={styles.title}>Verify your account</h1>
            <p className={styles.slogan}>
              Already verified your accoun?
              <Link href={"/login"} className={styles.signup__link}>
                Log in
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
              label="Email"
              variant="outlined"
              name="email"
              sx={{
                fontFamily: "Arial !important",
              }}
              onChange={handleEmailChange}
              onBlur={() => setEmailValid(validateEmail(formData.email))}
              error={!emailValid}
              helperText={!emailValid && "Invalid email"}
            />
            <span className={styles.verify_holder}>
              <p className={styles.code_label}>Verification Code:</p>
              <div className={styles.code_holder}>
                {code.map((digit, index) => (
                  <TextField
                    key={index}
                    name={`digit${index + 1}`}
                    type="text"
                    className={styles.code_input}
                    value={digit}
                    onChange={handleChange(index)}
                  />
                ))}
              </div>
              <p className={styles.code_note}>
                {!codeValid
                  ? "Code must be 8 digits and must have at least on letter"
                  : "Valid code, you can now verify"}
              </p>
            </span>
            <input
              type="submit"
              value={"Verify"}
              className={`${styles.submit__button} ${
                !codeValid ? styles.disabled : ""
              }`}
              disabled={!emailValid || !codeValid}
            />
          </form>
        </div>
      </Box>
    </main>
  );
};

export default VerifyComp;
