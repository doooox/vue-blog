<template>
  <div class="form-container">
    <InputComponent label="Enter Post Title:" type="text" v-model="title" />

    <label class="editor-label">Enter Post Content:</label>
    <JoditEditor v-model="content" />

    <label class="file-label">
      <span>Choose Image:</span>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/*"
      />
    </label>

    <div class="image-preview" v-if="imagePreview">
      <img :src="imagePreview" alt="Selected Image" />
    </div>

    <div class="category-checkbox-container">
      <div class="category-checkboxes">
        <label
          v-for="category in categories"
          :key="category._id"
          class="checkbox-label"
        >
          <input
            type="checkbox"
            :value="category._id"
            v-model="selectedCategories"
          />
          {{ category.name }}
        </label>
      </div>
    </div>

    <ButtonComponent @click.prevent="addPost" buttonText="Submit" />
    <ErrorMessageComponent v-if="error" :error="error" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { useBlogPostStore } from "@/stores/blogPostStore";
import ErrorMessageComponent from "@/components/UI/ErrorMessageComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";
import JoditEditor from "@/components/JoditEditor.vue";

const postStore = useBlogPostStore();
const router = useRouter();

const categories = ref([]);
const selectedCategories = ref([]);
const title = ref("");
const content = ref("");
const error = ref("");
const imagePreview = ref(null);
let image = null;

const handleFileUpload = ({ target }) => {
  const file = target.files[0];
  if (!file) return;
  image = file;

  const reader = new FileReader();
  reader.onload = () => (imagePreview.value = reader.result);
  reader.readAsDataURL(file);
};

onMounted(() => postStore.getCategories());

watch(
  () => postStore.categories,
  (val) => (categories.value = val)
);

const invalidForm = () =>
  !selectedCategories.value.length ||
  !title.value.trim() ||
  !content.value.trim() ||
  !image;

const addPost = async () => {
  if (invalidForm()) {
    error.value = "All Fields Are Required!";
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("image", image);
  selectedCategories.value.forEach((id) => formData.append("categories[]", id));

  await postStore.addBlogPost(formData);
  router.push("/");
};
</script>

<style scoped>
.form-container {
  max-width: 50%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.file-label {
  display: block;
  margin-bottom: 10px;
}

.file-label span {
  font-weight: bold;
}

.image-preview img {
  max-width: 100%;
  margin-top: 10px;
}

.category-checkbox-container {
  height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  background-color: #fff;
}

.category-checkboxes {
  margin-bottom: 10px;
}

.checkbox-label {
  display: block;
  margin-bottom: 5px;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 5px;
}
</style>
