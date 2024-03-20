<template>
    <div>
      <InputComponent label="Enter Post Title:" type="text" v-model="title"/>
      <InputComponent label="Enter Post Content:" type="text" v-model="content"/>
      <input type="file" @change="handleFileUpload" accept="image/*">
      <select multiple v-model="selectedCategories" v-if="categoriesLoaded">
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>
      <button @click="updatePost">Submit</button>
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
  