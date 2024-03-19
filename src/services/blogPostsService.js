import axiosInstance from "./axiosInstance";

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts");

  return response.data;
};

export const getSinglePost = async (postId) => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

export const getPostCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};
export const addPost = async (postData) => {
  const response = await axiosInstance.post("/posts/add", postData);
  return response.data;
};
export const removePost = async (postId) => {
  const response = await axiosInstance.delete(`/post/delete/${postId}`);
};
