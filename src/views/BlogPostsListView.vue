<template>
    <div v-for="post in posts" :key="post._id" class="container">
        <CardComponent :title="post.title" :content="post.content" :postId="post._id" :image="post.imagePath"/>
    </div>
</template>

<script setup>
import {useBlogPostStore} from "@/stores/blogPostStore"
import { onMounted, ref, watch } from "vue";
import CardComponent from "@/components/UI/CardComponent.vue";

const postStore = useBlogPostStore();
const posts = ref([]);


onMounted(()=>{
postStore.getPosts();
})

watch(()=>postStore.posts, (newPost)=>{
posts.value = newPost
});

</script>
<style scoped>
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px; 
}
</style>
