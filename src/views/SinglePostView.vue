<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <small>By: {{ post.author.username }}</small>
        <div v-for="categories in post.categories" :key="categories.name">
            <router-link :to="`/filter/${categories._id}`">
                {{ categories.name }}
            </router-link>
        </div>
        <div>
            <div v-for="comment in comments" :key="comment._id">
                <h2>Comments</h2>
                <h5>{{ comment.title }}</h5>
                <small>By: {{ comment.user.username }}</small>
                <p>{{ comment.text }}</p>
            </div>
        </div>
        <div>   
            <AddCommentComponent/>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
import { useBlogPostStore } from "@/stores/blogPostStore";
import { usePostComments } from "@/stores/postCommentsStore";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddCommentComponent from "@/components/AddCommentComponent.vue";

const postStore = useBlogPostStore();
const commentStore = usePostComments();
const route = useRoute();


const post = ref(null);
const comments = ref(null);
const postId = route.params.postId;

onMounted(() => {
    postStore.getSinglePost(postId);
    commentStore.getComments(postId)
});

watch(() => postStore.post, (newPost) => {
    post.value = newPost;
});

watch(()=>commentStore.comments, (newComments)=>{
    comments.value = newComments
})
</script>
