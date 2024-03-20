import axiosInstance from "./axiosInstance";

export const getAllPosts = async (pageSize, page) => {
  const queryParams = `?pageSize=${pageSize}&page=${page}`;
  const response = await axiosInstance.get(`/posts/${queryParams}`);

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
export const updatePost = async (postData, postId) => {
  const response = await axiosInstance.put(`/posts/update/${postId}`, postData);
  return response.data;
};
export const removePost = async (postId) => {
  return await axiosInstance.delete(`/posts/delete/${postId}`);
};
export const getPostsByCategory = async (categoryId, pageSize, page) => {
  const queryParams = `?pageSize=${pageSize}&page=${page}`;
  const response = await axiosInstance.get(
    `/posts/filter/${categoryId}/${queryParams}`
  );
  return response.data;
};
