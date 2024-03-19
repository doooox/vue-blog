<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <InputComponent label="Email" type="email" v-model="email" />
        </div>
        <div>
          <InputComponent label="Password" type="password" v-model="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/authStore';
  import InputComponent from "./UI/InputComponent.vue"
  import { ref } from 'vue';
  
  const authStore = useAuthStore();
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const login = async () => {
    try {
      await authStore.loginUser({ email: email.value, password: password.value });
    } catch (error) {
      console.error("Login failed:", error.message);
      error.value = error.message;
    }
  };
  
  </script>