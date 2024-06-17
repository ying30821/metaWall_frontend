<template>
  <Loading :isLoading="isLoadingPage" />
  <FeedSearchbar
    v-model="searchData"
    :options="timeSortOptions"
    @fetchData="fetchPosts"
    class="mb-4"
  />
  <section>
    <EmptyContentCard v-if="posts.length === 0">
      目前尚無動態，新增一則貼文吧！
    </EmptyContentCard>
    <div v-else class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @fetchData="fetchPosts"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { getPosts } from '@/api';
import { timeSortOptions } from '@/utils';
import Loading from '@/components/Loading.vue';
import FeedSearchbar from '@/components/FeedSearchbar.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';
import PostCard from '@/components/PostCard.vue';

const store = useStore();

const isLoadingPage = ref(false);
const searchData = reactive({
  timeSort: timeSortOptions[0],
  q: null,
});
const posts = reactive([]);

watch(
  () => searchData.timeSort,
  () => fetchPosts(),
);

const userData = computed(() => store.state.userInfo);

onMounted(() => fetchPosts());

const fetchPosts = async () => {
  isLoadingPage.value = true;
  const params = {
    timeSort: searchData.timeSort.key,
    q: searchData.q || null,
  };
  const res = await getPosts(params);
  posts.splice(0);
  const data = res.data.map((post) => ({
    ...post,
    isLike: post.likes.some((like) => like.user === userData.value.id),
  }));
  posts.push(...data);
  isLoadingPage.value = false;
};
</script>
