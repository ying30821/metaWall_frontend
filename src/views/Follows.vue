<template>
  <section class="space-y-4">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      追蹤名單
    </h2>
    <div class="space-y-4">
      <div
        v-for="follow in follows"
        :key="follow.id"
        class="card-shadow flex items-center gap-x-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-4"
      >
        <Avatar :image="follow.user.photo" :userName="follow.user.name" />
        <div class="flex-1 space-y-1">
          <h3 class="text-base font-bold">
            {{ follow.user.name }}
          </h3>
          <div
            class="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between"
          >
            <p class="truncate text-sm text-[#9B9893]">
              追蹤時間：{{ convertDate(follow.createdAt) }}
            </p>
            <p class="text-sm text-dark">
              {{ humanizeTime(follow.createdAt) }}追蹤
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { convertDate, humanizeTime } from '@/utils';
import Avatar from '@/components/Avatar.vue';

const follows = reactive([
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
