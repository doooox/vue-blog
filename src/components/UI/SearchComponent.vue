<template>
    <div class="container">
      <div class="input">
        <InputComponent label="Search" v-model="query" @input="onSearch"/>
      </div>

    <div>
      <ul class="search-results">
        <li v-for="post in searchResults" :key="post._id">
          <router-link :to="`/posts/${post._id}`" @click="resetSearch" class="result">{{ post.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script setup>
      import { ref } from 'vue';
    import { debounce } from 'lodash';
  
    import { useBlogPostStore } from '@/stores/blogPostStore';
    import InputComponent from './InputComponent.vue';
  
    const postStore = useBlogPostStore();
    const query = ref(null)
    const searchResults = ref([]);
    
    const onSearch = debounce(async () => {
      if(query.value.trim() !== "")
        {
          const result = await postStore.getSearchedBlogPosts(query.value);
          searchResults.value = result;
        }
    }, 700);

  const resetSearch = ()=>{
    query.value = null;
    searchResults.value = []
  };

  document.addEventListener('click', resetSearch)

  </script>
  
  <style scoped>
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    color: #fff;
    max-width: 20rem;
  }
  .input{
    margin: 1rem 0;
  }
  
  .search-results {
    position: absolute;
    top: 4.8rem;
    left:1.05rem;
    list-style-type: none;
    padding: 0;
    width: 11.7rem;
  }
  
  .search-results li {
    background-color: #fff;
    padding: 10px;
    cursor: pointer;
    text-align: center;
  
  }
  .result{
    text-decoration: none;
    color:#000;
    font-size: 1.2rem;
  }
  
  .search-results li:hover {
    background-color: #c6c3c3;
  }
  </style>
  