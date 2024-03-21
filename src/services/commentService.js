import axiosInstance from "./axiosInstance";

export const getPostComments = async (postId) => {
  const response = await axiosInstance.get(`/comment/${postId}`);

  return response.data;
};

export const addPostComments = async (postId, commentData) => {
  const response = await axiosInstance.post(
    `/comment/${postId}/add`,
    commentData
  );

  return response.data;
};
