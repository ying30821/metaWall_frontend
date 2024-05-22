<template>
  <div
    class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dark bg-secondary text-lg"
  >
    <img
      v-if="image && !isError"
      :src="image"
      :alt="`${userName}_avatar`"
      @error="handleError"
      class="aspect-square object-cover object-center"
    />
    <p v-else class="text-center">{{ userName.split('')[0] }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  image: String,
  userName: String,
});

const isError = ref(false);

const handleError = () => {
  isError.value = true;
};
</script>
