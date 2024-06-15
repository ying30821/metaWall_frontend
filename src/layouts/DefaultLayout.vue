<template>
  <div class="relative">
    <Navbar class="mb-12" />
    <div class="container relative mx-auto mb-8 flex w-full gap-x-7">
      <div class="flex-1">
        <router-view :key="$route.fullPath" />
      </div>
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>
