import { createRouter, createWebHistory } from "vue-router";
import blogPostListView from "../views/BlogPostsListView.vue";
import SinglePostView from "../views/SinglePostView.vue";
import AuthView from "@/views/AuthView.vue";
import AddPostView from "@/views/AddPostView.vue";
import UpdatePostView from "@/views/UpdatePostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: blogPostListView,
    },
    {
      path: "/register",
      name: "register",
      component: AuthView,
    },
    {
      path: "/login",
      name: "login",
      component: AuthView,
    },
    {
      path: "/posts/add",
      name: "addPost",
      component: AddPostView,
    },
    {
      path: "/posts/update/:postId",
      name: "updatePost",
      component: UpdatePostView,
      props: true,
    },
    {
      path: "/filter/:categoryId",
      name: "filteredPosts",
      component: blogPostListView,
      props: true,
    },
    {
      path: "/posts/:postId",
      name: "post",
      component: SinglePostView,
      props: true,
    },
  ],
});

export default router;
