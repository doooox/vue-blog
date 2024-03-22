<template>
    <div class="container">
        <h2>Add Comment</h2>
        <form @submit.prevent="addNewComment">
            <div>
                <InputComponent label="Comment Title" type="text" v-model="title"/>
            </div>
            <div>
                <InputComponent label="Comment text" type="text" v-model="text"/>
            </div>
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { usePostComments } from '@/stores/postCommentsStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import InputComponent from './UI/InputComponent.vue';

const route = useRoute();
const commentStore = usePostComments();

const title = ref('');
const text = ref('')

const addNewComment = async () => {
    try {
        await commentStore.addComment(route.params.postId, {title: title.value, text: text.value} );
    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
    .container{
        width: 100%;
        max-width: 80%;
        margin: 0 auto;
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