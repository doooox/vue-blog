<template>
    <div>
      <label>{{ label }}</label>
      <input :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    }
  });
  </script>
  