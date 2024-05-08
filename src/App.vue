<template>
  <div>
    <div v-if="['Login', 'Register'].includes($route.name)">
      <router-view />
    </div>
    <div v-else class="relative">
      <Navbar class="mb-12" />
      <div class="container w-full mx-auto flex relative gap-x-7">
        <div class="flex-1">
          <router-view />
        </div>
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>
