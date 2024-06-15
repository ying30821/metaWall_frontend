<template>
  <Loading :isLoading="isLoadingPage" />
  <section class="space-y-4">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      追蹤名單
    </h2>
    <EmptyContentCard v-if="followings.length === 0">
      目前尚無追蹤任何人
    </EmptyContentCard>
    <div class="space-y-4">
      <div
        v-for="following in followings"
        :key="following._id"
        @click="$router.push(`/feed/${following.user._id}`)"
        class="card-shadow group flex items-center gap-x-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-4 hover:cursor-pointer"
      >
        <Avatar :image="following.user.photo" :userName="following.user.name" />
        <div class="flex-1 space-y-1">
          <h3
            class="text-base font-bold group-hover:text-primary group-hover:underline"
          >
            {{ following.user.name }}
          </h3>
          <div
            class="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between"
          >
            <p class="truncate text-sm text-[#9B9893]">
              追蹤時間：{{ convertDate(following.createdAt) }}
            </p>
            <p class="text-sm text-dark">
              {{ humanizeTime(following.createdAt) }}追蹤
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { convertDate, humanizeTime } from '@/utils';
import { getFollowings } from '@/api';
import Loading from '@/components/Loading.vue';
import Avatar from '@/components/Avatar.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';

const isLoadingPage = ref(false);
const followings = reactive([]);

onMounted(() => fetchFollowing());

const fetchFollowing = async () => {
  isLoadingPage.value = true;
  const res = await getFollowings();
  followings.splice(0);
  followings.push(...res.data);
  isLoadingPage.value = false;
};
</script>
