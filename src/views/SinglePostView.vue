<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
import { useBlogPostStore } from "@/stores/blogPostStore";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const postStore = useBlogPostStore();
const post = ref(null);
const route = useRoute();
const postId = route.params.postId;

onMounted(() => {
    postStore.getSinglePost(postId);
});

watch(() => postStore.post, (newPost) => {
    post.value = newPost;
});
</script>
