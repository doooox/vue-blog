<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <InputComponent
          label="Email"
          type="email"
          v-model="email"
          require="true"
        />
      </div>
      <div>
        <InputComponent
          label="Password"
          type="password"
          v-model="password"
          require="true"
        />
      </div>
      <ButtonComponent type="submit" buttonText="Login" />
    </form>
    <div v-if="error">
      <ErrorMessageComponent :error="error" />
    </div>
  </div>
</template>
  
  <script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/authStore";
import InputComponent from "./UI/InputComponent.vue";
import ErrorMessageComponent from "./UI/ErrorMessageComponent.vue";
import ButtonComponent from "./UI/ButtonComponent.vue";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(null);

watch(
  () => authStore.error,
  (newError) => {
    error.value = newError;
  }
);

const login = async () => {
  await authStore.loginUser({ email: email.value, password: password.value });
  router.push("/");
};
</script>

<style scoped>
h2 {
  margin: 2rem;
}
</style>