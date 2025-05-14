<template>
  <div class="form-container">
    <InputComponent label="Enter Post Title:" type="text" v-model="title" />
    <label class="editor-label">Enter Post Content:</label>
    <JoditEditor v-model="content" />
    <label class="file-label">
      <span>Choose Image:</span>
      <input type="file" @change="handleFileUpload" accept="image/*" />
    </label>
    <div class="image-preview" v-if="imagePreview">
      <img :src="imagePreview" alt="Selected Image" />
    </div>
    <div class="category-select-container" v-if="categoriesLoaded">
      <label>Select Categories:</label>
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
    <ErrorMessageComponent v-if="error" :error="error" />
    <ButtonComponent @click="updatePost" buttonText="Submit" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import JoditEditor from "@/components/JoditEditor.vue";
import { useBlogPostStore } from "@/stores/blogPostStore";
import ErrorMessageComponent from "@/components/UI/ErrorMessageComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";

const postStore = useBlogPostStore();
const route = useRoute();
const router = useRouter();
const postId = route.params.postId;

const categories = ref([]);
const selectedCategories = ref([]);
const title = ref("");
const content = ref("");
const error = ref(null);
const image = ref(null);
const imagePreview = ref(null);
const categoriesLoaded = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  image.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.value = reader.result;
  };
  reader.readAsDataURL(file);
};

const loadCategoriesAndPost = async () => {
  try {
    await Promise.all([
      postStore.getCategories(),
      postStore.getSinglePost(postId),
    ]);
    categoriesLoaded.value = true;
  } catch (err) {
    console.error("Failed to load categories or post:", err);
    error.value = "Failed to load data. Please try again.";
  }
};

onMounted(() => {
  console.log("Post ID:", postId);
  loadCategoriesAndPost();
});

watch(
  () => postStore.categories,
  (newCategories) => {
    categories.value = newCategories;
  }
);

watch(
  () => postStore.post,
  (postDetails) => {
    if (postDetails) {
      title.value = postDetails.title;
      content.value = postDetails.content;
      selectedCategories.value = postDetails.categories.map(
        (category) => category._id
      );
      image.value = postDetails.imagePath;
      imagePreview.value = postDetails.imagePath;
    }
  }
);

const invalidForm = () => {
  return (
    !selectedCategories.value.length ||
    !title.value.trim() ||
    !content.value.trim() ||
    !image.value
  );
};

const updatePost = async () => {
  if (invalidForm()) {
    error.value = "All fields are required!";
    return;
  }

  let postData;
  if (image.value instanceof File) {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("content", content.value);
    formData.append("image", image.value);
    selectedCategories.value.forEach((categoryId) =>
      formData.append("categories[]", categoryId)
    );
    postData = formData;
  } else {
    // Keep existing image
    postData = {
      _id: postId,
      title: title.value,
      content: content.value,
      categories: selectedCategories.value,
      imagePath: image.value,
      author: null,
    };
  }

  try {
    await postStore.updateBlogPost(postData, postId);
    router.push(`/post/${postId}`);
  } catch (err) {
    console.error("Error updating post:", err);
    error.value = "Failed to update post. Please try again.";
  }
};
</script>

<style scoped>
.form-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.editor-label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

.file-label {
  display: block;
  margin: 20px 0 10px;
}

.file-label span {
  font-weight: bold;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
}

.category-select-container {
  margin: 20px 0;
}

.category-checkboxes {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 5px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 8px;
}
</style>