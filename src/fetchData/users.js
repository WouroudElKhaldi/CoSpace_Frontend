import axiosInstance from "@/utils/axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("user");
  if (response.status !== 200) {
    throw new Error("Failed to fetch Users");
  }
  return response.data;
};

export const getOneUser = async ({ id }) => {
  const response = await axiosInstance.post("user", {
    id: id,
  });
  if (response.status !== 200) {
    throw new Error("Failed to fetch User");
  }
  return response.data;
};

export const deleteUser = async ({ id }) => {
  const response = await axiosInstance.delete("user", {
    data: {
      id: id,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to delete user with the id of ${id}`);
  }
  return response.data;
};

export const addUser = async ({ data }) => {
  const res = await axiosInstance.post("user", {
    data: {
      ...data,
    },
  });

  if (res.status !== 200) {
    throw new Error(`Failed to add user`);
  }

  return res.data;
};

export const editUser = async ({ id, data }) => {
  const res = await axiosInstance.patch("user", {
    data: {
      id: id,
      ...data,
    },
  });

  if (res.status !== 200) {
    throw new Error(`Failed to update user with the id of ${id}`);
  }

  return res.data;
};
