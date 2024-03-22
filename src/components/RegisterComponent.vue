<template>
    <div>
      <h2>Registration</h2>
      <form @submit.prevent="register">
        <div>
          <InputComponent label="Username" type="text" v-model="username" require="true" />
        </div>
        <div>
          <InputComponent label="Email" type="email" v-model="email" require="true"/>
        </div>
        <div>
          <InputComponent label="Password" type="password" v-model="password" require="true"/>
        </div>
        <ButtonComponent type="submit" buttonText="Register" />
      </form>
      <div v-if="error" class="error-message">
        <ErrorMessageComponent :error="error"/>
      </div>
    </div>
  </template>

<script setup>


import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import {useAuthStore} from "@/stores/authStore"
import ErrorMessageComponent from "./UI/ErrorMessageComponent.vue";
import InputComponent from "./UI/InputComponent.vue";
import ButtonComponent from "./UI/ButtonComponent.vue";

const authStore = useAuthStore();
const router = useRouter()

const username = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

watch(()=>authStore.error, (newError)=>{
    error.value = newError
})

const register = async () =>{
  await authStore.registerUser({username: username.value, email: email.value, password: password.value});
  router.push('/')
};
</script>
<style scoped>
h2{
    margin: 2rem;
  }
</style>