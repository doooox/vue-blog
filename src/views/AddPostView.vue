<template>
  <div>
    <InputComponent label="Enter Post Title:" type="text" v-model="title"/>
    <InputComponent label="Enter Post Content:" type="text" v-model="content"/>
    <input type="file" @change="handleFileUpload" accept="image/*">
    <select multiple v-model="selectedCategories">
      <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>
    <button @click="addPost">Submit</button>
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

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  image = file;
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
