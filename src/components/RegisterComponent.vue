<template>
    <div>
      <h2>Registration</h2>
      <form @submit.prevent="register">
        <div>
          <InputComponent label="Username" type="text" v-model="username" />
        </div>
        <div>
          <InputComponent label="Email" type="email" v-model="email" />
        </div>
        <div>
          <InputComponent label="Password" type="password" v-model="password" />
        </div>
        <button type="submit" class="submit-button">Register</button>
      </form>
    </div>
  </template>

<script setup>
import {useAuthStore} from "@/stores/authStore"
import InputComponent from "./UI/InputComponent.vue";
import { ref } from "vue";

const authStore = useAuthStore();

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const register = async () =>{
    try {
        await authStore.registerUser({username: username.value, email: email.value, password: password.value});
    } catch (error) {
      console.error(error);
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