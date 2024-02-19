import axiosInstance from "@/utils/axiosInstance";

export const getTopRatedSpaces = async () => {
  const res = await axiosInstance.get("space/byRate");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

export const getAllSpaces = async () => {
  const res = await axiosInstance.post("space", {
    status: "Accepted",
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  console.log(res.data);
  return res.data;
};
