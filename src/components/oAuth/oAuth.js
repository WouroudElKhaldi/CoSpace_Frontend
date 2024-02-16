"use client";

import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";

const OAuth = ({ isLogin }) => {
  const loading = false;
  //   const {apiCall , loading } = useApi()
  //   const {fetchUserData , setUser} = useContext(AuthContext)
  //   const handleGoogleClick = async () => {
  //     try {
  //       const provider = new GoogleAuthProvider();
  //       const auth = getAuth(app);

  //       const result = await signInWithPopup(auth, provider);
  //       console.log(result);

  //       const response = await apiCall({
  //         url : `${process.env.REACT_APP_BACKEND_ENDPOINT}user/google`,
  //         method : 'post',
  //         data :         {
  //           name: result.user.displayName,
  //           email: result.user.email,
  //           photo: result.user.photoURL,
  //         }
  //       }
  //       );
  //       setUser(response)
  //       await fetchUserData()
  //       redirect("/");
  //     } catch (error) {
  //       console.log("could not sign in with google", error);
  //     }
  //   };
  return (
    <>
      {loading ? (
        <LoadingButton />
      ) : (
        <Button
          variant="contained"
          fullWidth
          //   onClick={handleGoogleClick}
          startIcon={
            <Image src={"/G.png"} width={20} height={20} alt="googleImage" />
          }
          sx={{
            color: "#b4602d",
            fontWeight: "600",
            fontSize: "16px",
            textTransform: "none",
            bgcolor: "white !important",
            height: "48px",
            ":hover": {
              bgcolor: "#ededf5 !important",
            },
          }}
        >
          {isLogin ? "Login with Google" : "Sign up with Google"}
        </Button>
      )}
    </>
  );
};

export default OAuth;
