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
  } catch (error) {
    console.log(error);
    throw new Error("Failed");
  }
};

export const Logout = async () => {
  await axiosInstance.post("user/logout");
};
