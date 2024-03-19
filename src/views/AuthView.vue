<template>
    <div v-if="routeName === 'login'">
      <LoginComponent/>
      <div>
        <router-link to="/register">Don't Have An Account Go To Register</router-link>
      </div>
    </div>
    <div v-if="routeName === 'register'">
      <RegisterComponent/>
      <router-link to="/login">Already Registered Go To Login</router-link>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  import LoginComponent from "@/components/LoginComponent.vue";
  import RegisterComponent from "@/components/RegisterComponent.vue";
import { watch } from "vue";
  
  const route = useRoute();
  let routeName = route.name;


  watch(() => route.name, (newValue ) => {
  routeName = newValue;
    });

  </script>
  