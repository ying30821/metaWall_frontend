<template>
  <div
    class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dark bg-gray-500 text-lg"
  >
    <img
      :src="image || userDefaultImg"
      :alt="`${userName}_avatar`"
      @error="handleError"
      class="aspect-square object-cover object-center"
    />
  </div>
</template>

<script setup>
import userDefaultImg from '@/assets/images/user_default.png';

defineProps({
  image: String,
  userName: String,
});

const handleError = (e) => {
  e.target.src = userDefaultImg;
};
</script>
