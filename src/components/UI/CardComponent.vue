<template>
    <div class="card-container">
        <h4 class="card-heading">{{ title }}</h4>
        <img :src="image" alt="" class="card-image">
        <button @click="viewPost">View</button>
        <button @click="deletePost">X</button>
        <button @click="updatePost">Edit</button>
    </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps({
    title:{
        type:String
    },
    content:{
        type:String
    },
    postId:{
        type:String
    },
    image:{
        type: String
    },
});

const router = useRouter();
const emit = defineEmits();

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
