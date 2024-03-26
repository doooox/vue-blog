<template>
  <div class="container">
    <div class="card-container">
      <h4 class="card-heading">{{ post.title }}</h4>
      <img :src="post.imagePath" alt="" class="card-image" />
      <div class="button-container">
        <ButtonComponent buttonText="View" @click="viewPost" />
        <ButtonComponent
          buttonText="Edit"
          @click="updatePost"
          v-if="user === post.author"
          buttonType="edit"
        />
        <ButtonComponent
          buttonText="Delete"
          @click="deletePost"
          v-if="user === post.author"
          buttonType="delete"
        />
        <br />
        <div class="like-container">
          <template v-if="user">
            <p>{{ post.likes.length }}</p>
            <button @click="likePost">
              <i class="fa-solid fa-heart"></i>
            </button>
          </template>
          <template v-else>
            <p>{{ post.likes.length }}</p>
            <button @click="likePost" disabled>
              <i class="fa-regular fa-heart"></i>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { defineProps, defineEmits, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  postId: String,
  post: {},
});

const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits();

const user = ref(authStore.user);

watch(
  () => authStore.user,
  (currentUser) => {
    user.value = currentUser;
  }
);

const viewPost = () => {
  router.push({ name: "post", params: { postId: props.postId } });
};

const deletePost = () => {
  emit("deletePost", props.postId);
};

const updatePost = () => {
  router.push({ name: "updatePost", params: { postId: props.postId } });
};

const likePost = () => {
  emit("likePost", props.postId);
};
</script>

<style scoped>
.card-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-heading {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
}

.card-image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.like-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.like-container button {
  border: none;
  color: red;
  font-size: 1.3rem;
  background-color: #ffffff00;
  transition: 0.3s;
}
.like-container button:hover {
  cursor: pointer;
  font-size: 1.4rem;
}
</style>
