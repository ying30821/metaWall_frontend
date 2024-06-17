<template>
  <Loading :isLoading="isLoadingPage" />
  <div
    v-if="feed.user && userData"
    class="relative mb-4 flex items-center rounded-lg border-2 border-dark bg-white before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:rounded-lg before:border-2 before:border-dark before:bg-white"
  >
    <img
      :src="feed.user.photo || userDefaultImg"
      :alt="`${feed.user.name}_avatar`"
      @error="handleError"
      class="aspect-square h-20 w-20 rounded-l-lg border-r-2 border-dark bg-[#E2EDFA] object-cover object-center"
    />
    <div
      class="flex flex-1 items-center justify-between gap-x-4 overflow-hidden p-4"
    >
      <div>
        <h3 class="font-bold">{{ feed.user.name }}</h3>
        <p class="text-sm">
          {{ toCurrency(feed.user.followers?.length) }} 人追蹤
        </p>
      </div>
      <button
        v-if="feed.user.id !== userData.id"
        :class="isFollowing ? 'bg-light' : 'bg-secondary'"
        @click="editFollowing"
        type="button"
        class="inline-flex justify-center rounded-lg border-2 border-dark px-8 py-1.5 text-center text-sm font-bold text-black shadow-[-2px_2px_0px_#000400] transition-all hover:scale-105 lg:text-base"
      >
        {{ isFollowing ? '取消追蹤' : '追蹤' }}
      </button>
    </div>
  </div>
  <FeedSearchbar
    v-model="searchData"
    :options="timeSortOptions"
    @fetchData="fetchUserPosts"
    class="mb-4"
  />
  <section>
    <EmptyContentCard v-if="feed.posts.length === 0">
      目前尚無動態，新增一則貼文吧！
    </EmptyContentCard>
    <div v-else class="space-y-4">
      <PostCard
        v-for="post in feed.posts"
        :key="post.id"
        :post="post"
        @fetchData="fetchUserPosts"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import userDefaultImg from '@/assets/images/user_default.png';
import { getUserPosts, followUser, unfollowUser } from '@/api';
import { toCurrency, timeSortOptions } from '@/utils';
import { notifySuccess, notifyError } from '@/utils/notify';
import Loading from '@/components/Loading.vue';
import FeedSearchbar from '@/components/FeedSearchbar.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';
import PostCard from '@/components/PostCard.vue';

const props = defineProps({
  userId: String,
});

const router = useRouter();
const store = useStore();
const isLoadingPage = ref(false);
const searchData = reactive({
  timeSort: timeSortOptions[0],
  q: null,
});
const feed = reactive({
  posts: [],
  user: {},
});

watch(
  () => searchData.timeSort,
  () => fetchUserPosts(),
);

const userData = computed(() => store.state.userInfo);
const isFollowing = computed(() => {
  if (Object.keys(feed.user).length === 0 || !userData.value) return false;
  return feed.user.followers.some(
    (follower) => follower.user === userData.value.id,
  );
});

onMounted(() => fetchUserPosts());

const fetchUserPosts = async () => {
  isLoadingPage.value = true;
  const params = {
    timeSort: searchData.timeSort.key,
    q: searchData.q || null,
  };
  const res = await getUserPosts(props.userId, params);
  if (res?.status === 'success') {
    const postsData = res.data.posts.map((post) => ({
      ...post,
      isLike: post.likes.some((like) => like.user === userData.value.id),
    }));
    feed.posts = postsData;
    feed.user = res.data.user;
    isLoadingPage.value = false;
    return;
  }
  router.go(-1);
};
const handleError = (e) => {
  e.target.src = userDefaultImg;
};
const editFollowing = async () => {
  const currentFunc = isFollowing.value ? unfollowUser : followUser;
  const res = await currentFunc(feed.user.id);
  if (res.status === 'success') {
    fetchUserPosts();
  }
};
</script>
