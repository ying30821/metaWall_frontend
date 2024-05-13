<template>
  <div
    v-if="isLoading"
    class="flex space-x-4 justify-center items-center bg-white/60 h-screen w-screen z-50 fixed top-0 left-0"
  >
    <span class="sr-only">Loading...</span>
    <div
      class="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"
    />
    <div
      class="h-8 w-8 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"
    />
    <div class="h-8 w-8 bg-primary rounded-full animate-bounce" />
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
});
</script>
