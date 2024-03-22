<template>
  <div class="form-container">
    <InputComponent label="Enter Post Title:" type="text" v-model="title"/>
    <InputComponent label="Enter Post Content:" v-model="content" input-type="textarea"/>
    <label class="file-label">
      <span>Choose Image:</span>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*">
    </label>
    <div class="image-preview" v-if="imagePreview">
      <img :src="imagePreview" alt="Selected Image">
    </div>
    <div class="category-checkbox-container">
      <div class="category-checkboxes">
        <label v-for="category in categories" :key="category._id" class="checkbox-label">
          <input type="checkbox" :value="category._id" v-model="selectedCategories">
          {{ category.name }}
        </label>
      </div>
    </div>
    <button @click="addPost" class="submit-button">Submit</button>
  </div>
</template>

<script setup>
import InputComponent from '@/components/UI/InputComponent.vue';
import { useBlogPostStore } from '@/stores/blogPostStore';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const postStore = useBlogPostStore();
const router = useRouter()

const categories = ref([]);
const selectedCategories = ref([]);
const title = ref('');
const content = ref('');
let image = null;
const imagePreview = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  image = file;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.value = reader.result;
  };
  reader.readAsDataURL(file);
};

onMounted(() => {
  postStore.getCategories();
});

watch(() => postStore.categories, (newCategories) => {
  categories.value = newCategories;
});

const addPost = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('content', content.value);
  formData.append('image', image);

  selectedCategories.value.forEach(categoryId => {
    formData.append('categories[]', categoryId);
  });
  try {
    await postStore.addBlogPost(formData);
    router.push('/')
  } catch (error) {
    console.error('Error adding post:', error);
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

.image-preview img {
  max-width: 100%;
  margin-top: 10px;
}

.category-checkbox-container {
  height: 150px; /* Set fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  margin-bottom: 10px;
  background-color: #fff;
}

.category-checkboxes {
  margin-bottom: 10px;
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
