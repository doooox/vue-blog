import axiosInstance from "./axiosInstance";

export const registerUser = async (credentials) => {
  console.log(credentials);
  const response = await axiosInstance.post("/auth/register", credentials);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  return await axiosInstance.post("/auth/logout");
};
