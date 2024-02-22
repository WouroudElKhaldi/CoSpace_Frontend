"use client";

import Modal from "@mui/material/Modal";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { Suspense } from "react";

const DoneModal = ({ type, message, open, handleClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  };

  const span = {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: 0,
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
          <div style={divStyle}>
            <IconButton
              style={span}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon
                sx={{
                  color: "black",
                }}
              />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Suspense fallback={<p>Loading icon...</p>}>
              {type === "success" ? (
                <iframe
                  width={"100%"}
                  height={200}
                  src="https://lottie.host/embed/249b78f2-94b6-4671-8216-5bca4dcdcce4/COzXMyjWji.json"
                ></iframe>
              ) : type === "error" ? (
                <iframe
                  width={"100%"}
                  height={200}
                  src="https://lottie.host/embed/fb9fd0a3-5cdd-48f6-a091-bebee04e1db3/Arogdki7sd.json"
                ></iframe>
              ) : (
                ""
              )}
            </Suspense>
            <p
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "1.2rem",
                margin: 0,
              }}
            >
              {message}
            </p>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DoneModal;
