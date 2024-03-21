<template>
    <div class="card-container">
        <h4 class="card-heading">{{ title }}</h4>
        <img :src="image" alt="" class="card-image">
        <div class="button-container">
            <button @click="deletePost" v-if="user === author">X</button>
            <button @click="updatePost" v-if="user === author">Edit</button>
            <button @click="viewPost">View</button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { defineProps,defineEmits, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    title:{
        type:String
    },
    postId:{
        type:String
    },
    image:{
        type: String
    },
    author:{
        type: String
    },
});

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits();

const user = ref(authStore.user); 

watch(() => authStore.user, (currentUser) => {
    user.value = currentUser; 
});
const viewPost = () =>{
    router.push({name:'post', params:{postId: props.postId}})
};

const deletePost = () =>{
    emit('deletePost', props.postId)
}
const updatePost = () =>{
    router.push({name:'updatePost', params:{postId: props.postId}})
};
</script>

<style scoped>

.card-container {
    border: 1px solid black;
    border-radius: 5px;
    width: 23%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px; 
    margin: 10px; 
}

.card-heading {
    margin-top: 10px; 
    font-size: 18px;
}

.card-image {
    width: 100%;
    max-height: 200px; 
    object-fit: contain; 
    margin-top: 10px; 
}

button {
    margin-top: 10px;
    padding: 5px 10px; 
    background-color: #007bff; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
}

button:hover {
    background-color: #0056b3;
}

</style>
