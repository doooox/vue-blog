
<template>
  <div class="app-container">
    <NavBarComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script setup>
import NavBarComponent from "./components/NavBarComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
