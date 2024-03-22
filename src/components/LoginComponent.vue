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
        <button type="submit" class="submit-button">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/authStore';
  import InputComponent from "./UI/InputComponent.vue"
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const login = async () => {
    try {
      await authStore.loginUser({ email: email.value, password: password.value });
      router.push('/')
    } catch (error) {
      console.error("Login failed:", error.message);
      error.value = error.message;
    }
  };
  
  </script>

<style scoped>
  h2{
    margin: 2rem;
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