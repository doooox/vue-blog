import { addPostComments, getPostComments } from "@/services/commentService";
import { defineStore } from "pinia";

export const usePostComments = defineStore("comments", {
  state: () => ({
    comments: [],
  }),
  actions: {
    async getComments(postId) {
      try {
        const commentData = await getPostComments(postId);
        this.comments = commentData;
      } catch (error) {
        console.error(error);
      }
    },
    async addComment(postId, commentData) {
      try {
        const newComment = await addPostComments(postId, commentData);
        this.comments.push(newComment);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
