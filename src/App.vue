<template>
  <div>
    <div v-if="['Login', 'Register'].includes($route.name)">
      <router-view />
    </div>
  </div>
</template>
