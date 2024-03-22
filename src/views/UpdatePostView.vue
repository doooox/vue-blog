<template>
  <div class="form-container">
    <InputComponent label="Enter Post Title:" type="text" v-model="title"/>
    <InputComponent label="Enter Post Content:" type="text" v-model="content" input-type="textarea"/>
    <label class="file-label">
      <span>Choose Image:</span>
      <input type="file" @change="handleFileUpload" accept="image/*">
    </label>
    <div class="category-select-container" v-if="categoriesLoaded">
      <label>Select Categories:</label>
      <div class="category-checkboxes">
        <label v-for="category in categories" :key="category._id" class="checkbox-label">
          <input type="checkbox" :value="category._id" v-model="selectedCategories">
          {{ category.name }}
        </label>
      </div>
    </div>
    <button @click="updatePost" class="submit-button">Submit</button>
  </div>
</template>

<script setup>
import InputComponent from '@/components/UI/InputComponent.vue';
import { useBlogPostStore } from '@/stores/blogPostStore';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const postStore = useBlogPostStore();
const route = useRoute();
const router = useRouter()
const postId = route.params.postId;

const categories = ref([]);
const selectedCategories = ref([]);
const title = ref('');
const content = ref('');
let image = null;
const categoriesLoaded = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  image = file;
};

const loadCategoriesAndPost = async () => {
  await Promise.all([
    postStore.getCategories(),
    postStore.getSinglePost(postId)
  ]);
  categoriesLoaded.value = true;
};

onMounted(() => {
  loadCategoriesAndPost();
});

watch(() => postStore.categories, (newCategories) => {
  categories.value = newCategories;
});

watch(() => postStore.post, (postDetails) => {
  title.value = postDetails.title;
  content.value = postDetails.content;
  selectedCategories.value = postDetails.categories.map(category => category._id);
  image = postDetails.imagePath;
});

const updatePost = async () => {
  let postData;

  if (typeof image === 'object') { 
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('image', image);

    selectedCategories.value.forEach(categoryId => {
      formData.append('categories[]', categoryId);
    });

    postData = formData;
  } else { 
    postData = {
      _id: postId,
      title: title.value,
      content: content.value,
      categories: selectedCategories.value.length > 0 ? selectedCategories.value : [],
      imagePath: image,
      author: null
    };
  }

  try {
    await postStore.updateBlogPost(postData, postId);
    router.push('/');
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.file-label {
  display: block;
  margin-bottom: 10px;
}

.file-label span {
  font-weight: bold;
}

.category-select-container {
  margin-bottom: 10px;
}

.category-checkboxes {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 5px;
}

.checkbox-label {
  display: block;
  margin-bottom: 5px;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
