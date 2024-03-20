import { defineStore } from "pinia";
import {
  addPost,
  getAllPosts,
  getPostCategories,
  getPostsByCategory,
  getSinglePost,
  removePost,
  updatePost,
} from "../services/blogPostsService";

export const useBlogPostStore = defineStore("posts", {
  state: () => ({
    posts: [],
    totalCount: null,
    post: null,
    categories: [],
  }),
  actions: {
    async getPosts(pageSize, page) {
      try {
        const postData = await getAllPosts(pageSize, page);
        this.posts = postData.posts;
        this.totalCount = postData.totalCount;
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
    async updateBlogPost(postData, postId) {
      try {
        const updatedPost = await updatePost(postData, postId);
        const index = this.posts.filter((post) => post._id === postId);
        this.posts[index] = updatedPost;
      } catch (error) {
        console.error(error);
      }
    },
    async deletePost(postId) {
      try {
        await removePost(postId);
        this.posts = this.posts.filter((post) => post._id !== postId);
      } catch (error) {
        console.error(error);
      }
    },
    async getPostsByCategory(categoryId, pageSize, page) {
      try {
        const categoryData = await getPostsByCategory(
          categoryId,
          pageSize,
          page
        );
        this.posts = categoryData.posts;
        this.totalCount = categoryData.totalCount;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
