<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div
      class="flex max-w-[90%] items-center gap-x-8 overflow-hidden border-2 border-dark bg-light px-6 py-8 shadow-[-6px_6px_0_-0_#00040029] lg:p-12 lg:py-16 xl:w-[52%] 2xl:w-[45%]"
    >
      <!-- <div
        class="h-60 w-60 flex-shrink-0 bg-login bg-contain bg-center bg-no-repeat lg:block lg:h-80 lg:w-80"
      /> -->

      <img
        :src="authImage"
        alt=""
        class="h-60 w-60 flex-shrink-0 object-contain object-center lg:block lg:h-80 lg:w-80"
      />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import authImage from '@/assets/images/auth_image.png';
</script>
