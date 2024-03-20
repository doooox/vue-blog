<template>
  <div>
    <div v-for="post in posts" :key="post._id" class="container">
      <CardComponent :title="post.title" :content="post.content" :postId="post._id" :image="post.imagePath" @deletePost="deletePost(post._id)"/>
    </div>
    
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
import { useRoute } from "vue-router";

const postStore = useBlogPostStore();
const route = useRoute(); 

const posts = ref([]);
const currentPage = ref(1);
const pageSize = 2;


const getPosts = async (categoryId = null) => {
  if (!categoryId) {
    await postStore.getPosts(pageSize, currentPage.value);
  } else {
    await postStore.getPostsByCategory(categoryId,pageSize, currentPage.value, );
  }
};

watch(() => route.params.categoryId, async (newCategoryId) => {
  currentPage.value = 1; 
  await getPosts(newCategoryId); 
});

onMounted(async () => {
  await getPosts(route.params.categoryId); 
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
