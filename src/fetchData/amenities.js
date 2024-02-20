import axiosInstance from "@/utils/axiosInstance";

export const getAmenities = async () => {
  const res = await axiosInstance.get("amenities");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};
