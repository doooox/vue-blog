<template>
  <div ref="editor"></div>
</template>
  
  <script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import { Jodit } from "jodit";
import "jodit/es5/jodit.min.css";

const props = defineProps({ modelValue: String });
const emit = defineEmits(["update:modelValue"]);

const editor = ref(null);
let jodit = null;

onMounted(() => {
  jodit = new Jodit(editor.value, {
    height: 400,
    minHeight: 300,
    uploader: { insertImageAsBase64URI: true },
  });
  jodit.value = props.modelValue;
  jodit.events.on("change", () => emit("update:modelValue", jodit.value));
});

watch(
  () => props.modelValue,
  (val) => {
    if (jodit && jodit.value !== val) jodit.value = val;
  }
);

onBeforeUnmount(() => jodit?.destruct());
</script>
  
  <style scoped>
.editor {
  margin-bottom: 1rem;
  min-height: 300px;
}
</style>
  