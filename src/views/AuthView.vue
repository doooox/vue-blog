<template>
  <div class="container">
    <div v-if="routeName === 'login'">
      <LoginComponent/>
      <div class="redirect-container">
        <router-link to="/register" class="redirect">Don't Have An Account? Go To Register</router-link>
      </div>
    </div>
    <div v-if="routeName === 'register'">
      <RegisterComponent/>
      <div class="redirect-container">
        <router-link to="/login" class="redirect">Already Registered? Go To Login</router-link>
      </div>
    </div>
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

<style scoped>
.container{
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
}
  .redirect-container{
    text-align: center;
  }
  .redirect{
    color: rgb(0, 81, 255);
    text-decoration: none;
  }
</style>
