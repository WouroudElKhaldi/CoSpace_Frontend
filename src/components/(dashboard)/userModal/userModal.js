"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../../login/login.module.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { addUser, editUser } from "@/fetchData/users";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserModal = ({
  type,
  setOpenNote,
  open,
  handleClose,
  selectedRowData,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    phoneNumber: "",
    status: "",
    image: "",
  });
  const [error, setError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "20rem",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: "1.5rem",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "16rem",
    paddingBottom: "1rem",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "##4d6188",
    padding: 0,
  };

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const { fullName, email, password, role, phoneNumber, status, image } =
    formData;

  // error validsation
  const validateFormData = () => {
    if (!fullName || !email || !password || !phoneNumber || !role || !status) {
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
    setLoading(true);

    // Validate email and password before submitting
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid) {
      setEmailValid(false);
    }
    if (!isPasswordValid) {
      setPasswordValid(false);
    }

    try {
      if (isEmailValid && isPasswordValid) {
        if (type === "add") {
          const response = await addUser({ formData });
          setLoading(false);
          setError(false);
          setSuccess(response);
          handleClose();
          setOpenNote({
            open: true,
            status: "success",
            message: `User ${response.fullName} has been added successfuly `,
          });
        } else if (type === "edit") {
          const response = await editUser({ formData });
          setLoading(false);
          setError(false);
          setSuccess(response);
          handleClose();
          setOpenNote({
            open: true,
            status: "success",
            message: `User ${formData.fullName} has been edited successfuly `,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            style={divStyle}
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
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {type === "add" ? "Add User" : "Edit User"}
            </Typography>
            <IconButton
              style={span}
              className={styles.Edit}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
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
            <input type="file" name="" id="" />
            <input
              type="submit"
              value={"Sign up"}
              className={`${styles.submit__button} ${
                formValidation === false ? styles.disabled : ""
              }`}
              disabled={formValidation === false}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;
