<template>
    <div>
      <div v-for="post in posts" :key="post._id" class="container">
        <CardComponent :title="post.title" :content="post.content" :postId="post._id" :image="post.imagePath" @deletePost="deletePost(post._id)"/>
      </div>
      
      <!-- Pagination controls -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useBlogPostStore } from "@/stores/blogPostStore";
  import { onMounted, ref, watch, computed } from "vue";
  import CardComponent from "@/components/UI/CardComponent.vue";
  
  const postStore = useBlogPostStore();
  const posts = ref([]);
  const currentPage = ref(1);
  const pageSize = 2;
  
  onMounted(() => {
    getPosts();
  });
  
  watch(() => postStore.posts, (newPosts) => {
    posts.value = newPosts;
  });

  const getPosts = async () => {
    await postStore.getPosts(pageSize, currentPage.value);
  };
  
  const deletePost = async (postId) => {
    await postStore.deletePost(postId);
    await getPosts();
  };
  
  const nextPage = async () => {
    currentPage.value++;
    await getPosts();
  };
  
  const prevPage = async () => {
    currentPage.value--;
    await getPosts();
  };
  
  const totalPages = computed(() => Math.ceil(postStore.totalCount / pageSize));
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px; 
  }
  
  .pagination {
    margin-top: 20px;
  }
  
  .pagination button {
    margin-right: 10px;
  }
  </style>
  