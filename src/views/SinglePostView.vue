<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <small>By: {{ post.author.username }}</small>
        <div v-for="categories in post.categories" :key="categories.name">
            <router-link :to="`/filter/${categories._id}`">
                {{ categories.name }}
            </router-link>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
import { useBlogPostStore } from "@/stores/blogPostStore";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const postStore = useBlogPostStore();
const route = useRoute();
const router = useRouter()

const post = ref(null);
const postId = route.params.postId;


onMounted(() => {
    postStore.getSinglePost(postId);

});

watch(() => postStore.post, (newPost) => {
    post.value = newPost;
});
</script>
