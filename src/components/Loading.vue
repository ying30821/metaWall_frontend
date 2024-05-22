<template>
  <div
    v-if="isLoading"
    class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center space-x-4 bg-white/60"
  >
    <span class="sr-only">Loading...</span>
    <div
      class="h-8 w-8 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"
    />
    <div
      class="h-8 w-8 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"
    />
    <div class="h-8 w-8 animate-bounce rounded-full bg-primary" />
  </div>
</template>

<script setup>
defineProps({
  isLoading: Boolean,
});
</script>
