<template>
    
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();


onMounted(async ()=>{
    await authStore.logoutUser()
    router.push('/')
});

</script>