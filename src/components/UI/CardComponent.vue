<template>
    <div class="container">
        <div class="card-container">
            <h4 class="card-heading">{{ title }}</h4>
            <img :src="image" alt="" class="card-image">
            <div class="button-container">
                <ButtonComponent buttonText="View" @click="viewPost" />
                <ButtonComponent buttonText="Edit" @click="updatePost" v-if="user === author"  buttonType="edit" />
                <ButtonComponent buttonText="Delete" @click="deletePost" v-if="user === author" buttonType="delete" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { defineProps,defineEmits, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ButtonComponent from './ButtonComponent.vue';

const props = defineProps({
    title:String,
    postId:String,
    image:String,
    author:String
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
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-heading {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
}

.card-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}


</style>
