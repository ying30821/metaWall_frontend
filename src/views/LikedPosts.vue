<template>
  <section class="space-y-4">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      我按讚的貼文
    </h2>
    <EmptyContentCard v-if="likePosts.length === 0">
      目前尚無貼文
    </EmptyContentCard>
    <div v-else class="space-y-4">
      <div
        v-for="post in likePosts"
        :key="post.id"
        class="card-shadow flex items-center justify-between gap-x-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-4"
      >
        <div class="flex flex-1 items-center gap-x-4 truncate">
          <Avatar :image="post.user.photo" :userName="post.user.name" />
          <div class="space-y-1 truncate">
            <h3 class="text-base font-bold">
              {{ post.user.name }}
            </h3>
            <div
              class="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-between"
            >
              <p class="truncate text-sm text-[#9B9893]">
                發文時間：{{ convertDate(post.createdAt) }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-4 lg:gap-x-9">
          <button
            @click="deleteLike(post.id)"
            type="button"
            class="flex flex-col items-center transition-all hover:scale-105"
          >
            <span class="material-symbols-outlined text-2xl text-primary">
              thumb_up
            </span>
            <span class="text-center font-bold">取消</span>
          </button>
          <button
            @click="$router.push(`posts/${post.id}`)"
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { convertDate } from '@/utils';
import { getLikePosts, deletePostLike } from '@/api';
import Avatar from '@/components/Avatar.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';

const store = useStore();
const likePosts = reactive([]);

const userData = computed(() => store.state.userInfo);

onMounted(() => fetchLikePosts());

const fetchLikePosts = async () => {
  const res = await getLikePosts();
  likePosts.splice(0);
  likePosts.push(...res.data);
};
const deleteLike = async (id) => {
  const res = await deletePostLike(id);
  if (res.status === 'success') {
    fetchLikePosts();
  }
};
</script>
