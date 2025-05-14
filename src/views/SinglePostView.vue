<template>
  <div class="post-details-container">
    <div v-if="post" class="post-details">
      <h1>{{ post.title }}</h1>
      <div class="post-info">
        <div class="post-author">
          <small>By: {{ post.author?.username || "Unknown" }}</small>
        </div>
        <div class="category-links">
          <span v-for="category in post.categories" :key="category._id">
            <router-link
              :to="`/filter/${category._id}`"
              class="category-link"
              >{{ category.name }}</router-link
            >
          </span>
        </div>
      </div>
      <div class="post-image" v-if="post.imagePath">
        <img :src="post.imagePath" :alt="post.title" />
      </div>
      <div class="post-content">
        <div v-html="safeHtml"></div>
      </div>
      <div class="comments-section">
        <h2>Comments</h2>
        <div v-if="comments?.length">
          <div v-for="comment in comments" :key="comment._id" class="comment">
            <h5>{{ comment.title }}</h5>
            <small>By: {{ comment.user?.username || "Anonymous" }}</small>
            <p>{{ comment.text }}</p>
          </div>
        </div>
        <p v-else>No comments yet.</p>
      </div>
      <div class="add-comment-section" v-if="user">
        <AddCommentComponent />
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import DOMPurify from "dompurify";

import { useBlogPostStore } from "@/stores/blogPostStore";
import { usePostComments } from "@/stores/postCommentsStore";
import { useAuthStore } from "@/stores/authStore";
import AddCommentComponent from "@/components/AddCommentComponent.vue";

const postStore = useBlogPostStore();
const authStore = useAuthStore();
const commentStore = usePostComments();
const route = useRoute();

const post = ref(null);
const comments = ref(null);
const user = ref(authStore.user);

// Sanitize Jodit Editor content
const safeHtml = computed(() =>
  post.value?.content ? DOMPurify.sanitize(post.value.content) : ""
);

const updatePost = async () => {
  const postId = route.params.postId;
  try {
    await Promise.all([
      postStore.getSinglePost(postId),
      commentStore.getComments(postId),
    ]);
    post.value = postStore.post;
    comments.value = commentStore.comments;
  } catch (error) {
    console.error("Failed to load post or comments:", error);
    post.value = null;
    comments.value = [];
  }
};

onMounted(() => {
  console.log("Post ID:", route.params.postId);
  updatePost();
});

watch(
  () => route.params.postId,
  () => {
    console.log("Post ID changed:", route.params.postId);
    updatePost();
  }
);

watch(
  () => authStore.user,
  (currentUser) => {
    user.value = currentUser;
  }
);

watch(
  () => postStore.post,
  (newPost) => {
    post.value = newPost;
  }
);

watch(
  () => commentStore.comments,
  (newComments) => {
    comments.value = newComments;
  }
);
</script>

<style scoped>
.post-details-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.post-details {
  max-width: 800px;
  margin: 0 auto;
}

.post-info {
  margin-bottom: 10px;
}

.post-author {
  margin: 1rem 0;
}

.category-links span {
  margin-right: 10px;
}

.category-link {
  margin: 1rem 0;
  padding: 0.3rem 0.7rem;
  background-color: #777575b3;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}

.category-link:hover {
  background-color: #4f4d4db3;
}

.post-image {
  margin-bottom: 20px;
}

.post-image img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.post-content {
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 10px 0;
  border-radius: 3px;
}

.post-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 15px 0;
}

.post-content :deep(th),
.post-content :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.post-content :deep(blockquote) {
  border-left: 3px solid #ccc;
  margin: 15px 0;
  padding-left: 15px;
  color: #666;
  font-style: italic;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin: 15px 0 10px;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 10px 0;
  padding-left: 20px;
}

.post-content :deep(li) {
  margin-bottom: 5px;
}

.post-content :deep(a) {
  color: #007bff;
  text-decoration: none;
}

.post-content :deep(a:hover) {
  text-decoration: underline;
}

.comments-section {
  margin-top: 20px;
}

h2 {
  margin-bottom: 1rem;
}

.comment {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
}

.comment p {
  background-color: #cccccc4c;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem 0;
}

.add-comment-section {
  margin-top: 20px;
}

.loading {
  text-align: center;
}
</style>