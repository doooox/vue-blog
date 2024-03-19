import { defineStore } from "pinia";
import {
  addPost,
  getAllPosts,
  getPostCategories,
  getSinglePost,
} from "../services/blogPostsService";

export const useBlogPostStore = defineStore("posts", {
  state: () => ({
    posts: [],
    post: null,
    categories: [],
  }),
  actions: {
    async getPosts() {
      try {
        const postData = await getAllPosts();
        this.posts = postData.posts;
      } catch (error) {
        console.error(error);
      }
    },
    async getSinglePost(postId) {
      try {
        const singlePostData = await getSinglePost(postId);
        this.post = singlePostData;
      } catch (error) {
        console.error(error);
      }
    },
    async addBlogPost(postData) {
      try {
        const newPost = await addPost(postData);
        this.posts.push(newPost);
      } catch (error) {
        console.error(error);
      }
    },
    async getCategories() {
      try {
        const postCategories = await getPostCategories();
        this.categories = postCategories;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
