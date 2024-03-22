<template>
    <div class="post-details-container">
      <div v-if="post" class="post-details">
        <h1>{{ post.title }}</h1>
        <div class="post-info">
            <div class="post-author">
                <small >By: {{ post.author.username }}</small>
            </div>
            <div class="category-links">
                <span v-for="category in post.categories" :key="category._id">
                <router-link :to="`/filter/${category._id}`" class="category-link" >{{ category.name }}</router-link>
                </span>
            </div>
        </div>
        <div class="post-image">
          <img :src="post.imagePath" alt="Post Image">
        </div>
        <div class="post-content">
          <p>{{ post.content }}</p>
        </div>
        <div class="comments-section">
          <h2>Comments</h2>
          <div v-for="comment in comments" :key="comment._id" class="comment">
            <h5>{{ comment.title }}</h5>
            <small>By: {{ comment.user.username }}</small>
            <p>{{ comment.text }}</p>
          </div>
        </div>
        <div class="add-comment-section" v-if="user">   
          <AddCommentComponent/>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useBlogPostStore } from "@/stores/blogPostStore";
  import { usePostComments } from "@/stores/postCommentsStore";
  import { useAuthStore } from "@/stores/authStore";

  import { onMounted, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  
  import AddCommentComponent from "@/components/AddCommentComponent.vue";
 
  
  const postStore = useBlogPostStore();
  const authStore = useAuthStore()
  const commentStore = usePostComments();
  const route = useRoute();
  
  const post = ref(null);
  const comments = ref(null);
  const postId = route.params.postId;
  const user = ref(authStore.user)
  
  onMounted(() => {
    postStore.getSinglePost(postId);
    commentStore.getComments(postId);
  });

  watch(()=> authStore.user, (currentUser)=>{
    user.value = currentUser
  })
  
  watch(() => postStore.post, (newPost) => {
    post.value = newPost;
  });
  
  watch(() => commentStore.comments, (newComments) => {
    comments.value = newComments;
  });
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
  
  .post-author{
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
  }
  
  .comments-section {
    margin-top: 20px;
  }

  h2{
    margin-bottom: 1rem;
  }
  
  .comment {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border:1px solid #ccc;
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
  </style>
  