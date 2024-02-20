import axiosInstance from "@/utils/axiosInstance";

export const LoginFunction = async (data) => {
  try {
    const { email, password } = data;
    const res = await axiosInstance.post("/user/login", {
      email: email,
      password: password,
    });
    if (res.status !== 200) {
      throw new Error("Failed to Login");
    }
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export const SignupFunction = async (data) => {
  try {
    const { fullName, email, password, role, phoneNumber } = data;
    const res = await axiosInstance.post("/user/signup", {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      phoneNumber: phoneNumber,
    });
    if (res.status !== 200) {
      throw new Error("Failed to Sign Up");
    }
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export const VerifyFunction = async (data) => {
  try {
    const { email, code } = data;
    const res = await axiosInstance.post("/user/verify", {
      email: email,
      code: code,
    });
    if (res.status !== 200) {
      throw new Error("Failed to Verify Account");
    }
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export const Logout = async () => {
  await axiosInstance.post("user/logout");
};
