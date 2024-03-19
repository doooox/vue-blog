<template>
    <div class="container">
        <div>
        <router-link class="site-hero" to="/">BLOG APP</router-link>
        </div>
    <div class="navigation-links-container">
        <div class="navigation-links">
            <router-link class="link" to="/register">Register</router-link>
            <router-link class="link" to="/login">Login</router-link>
            <button @click="logout">Logout</button>
        </div>
    </div>
    </div>
   
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';


const authStore = useAuthStore();

const logout = async () => {
  try {
    await authStore.logoutUser();
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

</script>

<style scoped>
    .container{
        height: 6rem;
        width: 100%;
        background-color: rgb(47, 47, 193);
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
        
    }
    .link{
        color: white;
        font-size: 1.3rem;
        text-decoration: none;
    }
</style>