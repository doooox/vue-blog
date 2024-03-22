<template>
    <div class="container">
        <div>
        <router-link class="site-hero" to="/">BLOG APP</router-link>
        </div>
    <div class="navigation-links-container">
        <div class="navigation-links">
            <router-link class="link" to="/register" v-if="!user">Register</router-link>
            <router-link class="link" to="/login" v-if="!user">Login</router-link>
            <router-link class="link" to="/posts/add" v-if="user">Add Post</router-link>
            <router-link class="link" to="/logout" v-if="user">Logout</router-link>
        </div>
    </div>
    </div>
   
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter()

const user = ref(null);

watch(()=>authStore.user, (currentUser)=>{
    user.value = currentUser;
})

const logout = async () => {
  try {
    await authStore.logoutUser();
    router.push('/')
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style scoped>
    .container{
        height: 6rem;
        width: 100%;
        background-color: #212529;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-bottom: 1rem;
    }
    .site-hero{
        font-size: 2rem;
        color: white;
        text-decoration: none;
    }
    .navigation-links-container{
        width: 12rem;
    }
    .navigation-links{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .link{
        color: white;
        font-size: 1.3rem;
        text-decoration: none;
    }
</style>