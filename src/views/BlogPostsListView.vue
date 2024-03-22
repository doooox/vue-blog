<template>
  <div class="container" v-if="posts">
    <div v-for="(row, index) in rows" :key="index" class="row-container" >
      <div v-for="post in row" :key="post._id" class="card-container" >
        <CardComponent 
          :title="post.title" 
          :postId="post._id" 
          :image="post.imagePath"
          :author="post.author" 
          @deletePost="deletePost(post._id)"
        />
      </div>
    </div>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>

  <div v-else class="loading">
      <p>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

import { useBlogPostStore } from "@/stores/blogPostStore";
import { useAuthStore } from "@/stores/authStore";
import CardComponent from "@/components/UI/CardComponent.vue";

const postStore = useBlogPostStore();
const authStore = useAuthStore();
const route = useRoute(); 

const posts = ref([]);
const currentPage = ref(1);
const pageSize = 10; 
const user = ref(null);

const getPosts = async (categoryId = null) => {
  if (!categoryId) {
    await postStore.getPosts(pageSize, currentPage.value);
  } else {
    await postStore.getPostsByCategory(categoryId, pageSize, currentPage.value);
  }
};

onMounted(async () => {
  await getPosts(route.params.categoryId);
  authStore.getUser();
});

watch(() => authStore.user, (currentUser) => {
  user.value = currentUser;
});

watch(() => route.params.categoryId, async (newCategoryId) => {
  currentPage.value = 1; 
  await getPosts(newCategoryId); 
});

watch(() => postStore.posts, (newPosts) => {
  posts.value = newPosts;
});

const deletePost = async (postId) => {
  await postStore.deletePost(postId);
  await getPosts(route.params.categoryId); 
};

const nextPage = async () => {
  currentPage.value++;
  await getPosts(route.params.categoryId); 
};

const prevPage = async () => {
  currentPage.value--;
  await getPosts(route.params.categoryId); 
};

const totalPages = computed(() => Math.ceil(postStore.totalCount / pageSize));

const rows = computed(() => {
  const result = [];
  for (let i = 0; i < posts.value.length; i += 4) { 

    result.push(posts.value.slice(i, i + 4));
  }
  return result;
});
</script>

<style scoped>
.row-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 20px;
}

.card-container {
    width: calc(25% - 20px); 
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-heading {
    margin-top: 10px;
    font-size: 18px;
}

.card-image {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    margin-top: 10px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.pagination {
    margin: 0.5rem 2rem;
    text-align: end;
}

.pagination button {
    margin-right: 10px;
}
</style>

   
