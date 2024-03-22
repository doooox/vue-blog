<template>
  <div class="input-container">
    <label class="input-label">{{ label }}</label>
    <template v-if="inputType === 'input'">
      <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="input-field" :type="type" />
    </template>
    <template v-else-if="inputType === 'textarea'">
      <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="textarea-field"></textarea>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type:{
    type:String,
    default:'text'
  },
  inputType: {
    type: String,
    default: 'input'
  },
  modelValue: {
    type: [String, Number],
    required: true
  }
});
</script>

<style scoped>
.input-container {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.textarea-field {
  resize: vertical; /* Allow vertical resizing */
  min-height: 100px; /* Set a minimum height */
}
</style>
