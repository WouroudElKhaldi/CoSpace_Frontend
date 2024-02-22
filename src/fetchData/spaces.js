import axiosInstance from "@/utils/axiosInstance";

// getting the top 5 rated spaces
export const getTopRatedSpaces = async () => {
  const res = await axiosInstance.get("space/byRate");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

// getting all the spaces (approved)
export const getAllSpaces = async () => {
  const res = await axiosInstance.post("space");

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

// getting space images
export const getSpaceImage = async (spaceId) => {
  const res = await axiosInstance.post("space/image/bySpace", {
    spaceId: spaceId,
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};

// filtering spaces
export const filterSpaces = async ({
  minPrice,
  maxPrice,
  selectedAmenities,
  selectedCategories,
}) => {
  console.log(minPrice);
  const res = await axiosInstance.post("space/filter", {
    minPrice,
    maxPrice,
    amenities: selectedAmenities,
    categories: selectedCategories,
  });

  if (res.status !== 200) {
    throw new Error("Failed to filter spaces");
  }

  return res.data;
};

// search a space by name or city
export const searchSpace = async ({ criteria, search }) => {
  let res;
  if (criteria === "name") {
    res = await axiosInstance.post("space/search", {
      name: search,
    });
  } else if (criteria === "cityName") {
    res = await axiosInstance.post("space/search", {
      cityName: search,
    });
  }

  if (res.status !== 200) {
    throw new Error("Failed to fetch Data");
  }

  return res.data;
};
