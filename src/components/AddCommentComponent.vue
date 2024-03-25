<template>
  <div class="container">
    <h2>Add Comment</h2>
    <form @submit.prevent="addNewComment">
      <div>
        <InputComponent label="Comment Title" type="text" v-model="title" />
      </div>
      <div>
        <InputComponent label="Comment text" type="text" v-model="text" />
      </div>
      <ButtonComponentVue type="submit" buttonText="Submit" />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { usePostComments } from "@/stores/postCommentsStore";
import InputComponent from "./UI/InputComponent.vue";
import ButtonComponentVue from "./UI/ButtonComponent.vue";

const route = useRoute();
const commentStore = usePostComments();

const title = ref("");
const text = ref("");

const addNewComment = async () => {
  try {
    await commentStore.addComment(route.params.postId, {
      title: title.value,
      text: text.value,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
}
</style>