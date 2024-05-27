<template>
  <component :is="currentLayout">
    <router-view />
  </component>
  <Notifications />
</template>

<script setup>
import { computed, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Notifications from '@/components/Notifications.vue';

const route = useRoute();
const layoutMap = new Map([
  ['DefaultLayout', DefaultLayout],
  ['AuthLayout', AuthLayout],
]);

const currentLayout = computed(() => {
  if (!route.meta.layout) return 'div';
  return markRaw(layoutMap.get(route.meta.layout));
});
</script>
