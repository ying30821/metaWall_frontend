<template>
  <section class="space-y-4">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      我按讚的貼文
    </h2>
    <div class="space-y-4">
      <div
        v-for="like in likes"
        :key="like.id"
        class="card-shadow flex items-center justify-between gap-x-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-4"
      >
        <div class="flex flex-1 items-center gap-x-4 truncate">
          <Avatar :image="like.user.photo" :userName="like.user.name" />
          <div class="space-y-1 truncate">
            <h3 class="text-base font-bold">
              {{ like.user.name }}
            </h3>
            <div
              class="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between"
            >
              <p class="truncate text-sm text-[#9B9893]">
                發文時間：{{ convertDate(like.createdAt) }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-9">
          <button
            type="button"
            class="flex flex-col items-center transition-all hover:scale-105"
          >
            <span class="material-symbols-outlined text-2xl text-primary">
              thumb_up
            </span>
            <span class="text-center font-bold">取消</span>
          </button>
          <button
            type="button"
            class="flex flex-col items-center transition-all hover:scale-105"
          >
            <span class="material-symbols-outlined text-2xl text-dark">
              arrow_circle_right
            </span>
            <span class="text-center font-bold">查看</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { convertDate } from '@/utils';
import Avatar from '@/components/Avatar.vue';

const likes = reactive([
  {
    id: 1,
    user: {
      name: '西林',
      photo: 'https://fakeimg.pl/250x100/ff0000/',
    },
    createdAt: '2024-05-08T14:45:59.587Z',
  },
  {
    id: 1,
    user: {
      name: '西林',
      photo: 'https://fakeimg.pl/250x100/ff0000/',
    },
    createdAt: '2024-05-08T14:45:59.587Z',
  },
  {
    id: 1,
    user: {
      name: '西林',
      photo: 'https://fakeimg.pl/250x100/ff0000/',
    },
    createdAt: '2024-05-08T14:45:59.587Z',
  },
]);
</script>
