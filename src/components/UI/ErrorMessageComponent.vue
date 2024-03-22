<template>
    <div class="error-message">
        {{ error }}
    </div>
</template>

<script setup>
const props = defineProps({
    error:String
});

</script>

<style scoped>
.error-message {
  color: red;
  font-size: 1rem;
}
</style>