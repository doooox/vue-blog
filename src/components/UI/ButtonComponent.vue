<template>
  <button
    :style="{ backgroundColor: bgColor }"
    :class="{ green: isEdit, red: isDelete }"
    type="type">
    {{ buttonText }}
  </button>
</template>

<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    buttonType: String,
    buttonText: String,
    type: String,
  });

  let bgColor = "#007bff";
  const isEdit = props.buttonType === "edit";
  const isDelete = props.buttonType === "delete";

  if (isEdit) {
    bgColor = "#28a745";
  } else if (isDelete) {
    bgColor = "#dc3545";
  }
</script>

<style scoped>
  button {
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3 !important;
  }
  .red:hover {
    background-color: #cf2002 !important;
  }

  .green:hover {
    background-color: #309006 !important;
  }
</style>
