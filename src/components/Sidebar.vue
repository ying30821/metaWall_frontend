<template>
  <div
    class="sticky right-0 top-20 z-10 h-fit w-[320px] space-y-6 border-2 border-dark bg-white px-6 py-8"
  >
    <button
      @click="$router.push('/new-post')"
      type="button"
      class="btn-primary w-full shadow-[-2px_2px_0px_#000400]"
    >
      張貼動態
    </button>
    <div class="space-y-[22px]">
      <router-link
        v-if="userData"
        :to="`/feed/${userData._id}`"
        class="group flex items-center gap-x-4"
      >
        <Avatar
          :image="userData.photo"
          :userName="userData.name"
          class="h-[50px] w-[50px] transition-all group-hover:scale-110"
        />
        <p v-if="userData" class="font-bold group-hover:text-primary">
          {{ userData.name }}
        </p>
      </router-link>
      <router-link to="/followings" class="group flex items-center gap-x-4">
        <div
          class="inline-flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dark bg-[#E2EDFA] transition-all group-hover:scale-110 group-hover:bg-primary"
        >
          <span
            class="material-symbols-outlined text-3xl text-black group-hover:text-white"
          >
            notifications
          </span>
        </div>
        <p class="font-bold group-hover:text-primary">追蹤清單</p>
      </router-link>
      <router-link to="/likes" class="group flex items-center gap-x-4">
        <div
          class="inline-flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dark bg-[#E2EDFA] transition-all group-hover:scale-110 group-hover:bg-primary"
        >
          <span
            class="material-symbols-outlined text-2xl text-black group-hover:text-white"
          >
            thumb_up
          </span>
        </div>
        <p class="font-bold group-hover:text-primary">我按讚的文章</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Avatar from './Avatar.vue';
import UserFeed from '../views/UserFeed.vue';

const store = useStore();

const userData = computed(() => store.state.userInfo);
</script>
