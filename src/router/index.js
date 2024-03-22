import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/authStore";
import blogPostListView from "@/views/BlogPostsListView.vue";
import SinglePostView from "@/views/SinglePostView.vue";
import AuthView from "@/views/AuthView.vue";
import AddPostView from "@/views/AddPostView.vue";
import UpdatePostView from "@/views/UpdatePostView.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";

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
      meta: { guestOnly: true },
    },
    {
      path: "/login",
      name: "login",
      component: AuthView,
      meta: { guestOnly: true },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutComponent,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/add",
      name: "addPost",
      component: AddPostView,
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/update/:postId",
      name: "updatePost",
      component: UpdatePostView,
      props: true,
      meta: { requiresAuth: true },
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
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.getUser();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requiresAuth && !authStore.user) {
    next({ name: "login" });
  } else if (guestOnly && authStore.user) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
