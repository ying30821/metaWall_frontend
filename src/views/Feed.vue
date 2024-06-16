<template>
  <Loading :isLoading="isLoadingPage" />
  <div class="mb-4 flex items-stretch gap-x-3">
    <Listbox as="div" v-model="searchData.timeSort">
      <div class="relative">
        <ListboxButton
          class="relative h-full w-full min-w-40 cursor-default bg-white py-2.5 pl-4 pr-10 text-left ring-2 ring-inset ring-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span class="block truncate">
            {{ searchData.timeSort.value }}
          </span>
          <span
            class="material-symbols-outlined pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            expand_more
          </span>
        </ListboxButton>
        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <ListboxOption
              as="template"
              v-for="option in options"
              :key="option.key"
              :value="option"
              v-slot="{ active, selected }"
            >
              <li
                :class="[
                  active ? 'bg-primary text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option.value }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div class="flex w-full">
      <input
        v-model.trim="searchData.q"
        type="text"
        class="flex-grow-1 block w-full border-2 border-r-0 border-black px-4 py-1.5 placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
        placeholder="搜尋貼文"
      />
      <button
        @click="fetchPosts"
        type="button"
        class="btn-primary flex-none rounded-none px-3 py-2"
      >
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
  </div>
  <section>
    <EmptyContentCard v-if="posts.length === 0">
      目前尚無動態，新增一則貼文吧！
    </EmptyContentCard>
    <div v-else class="space-y-4">
      <div
        v-for="post in posts"
        :key="post"
        class="card-shadow space-y-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-6 lg:px-10"
      >
        <div class="flex items-center gap-x-4">
          <Avatar
            :image="post.user.photo"
            :userName="post.user.name"
            @click="$router.push(`/feed/${post.user.id}`)"
            class="h-11 w-11 hover:cursor-pointer hover:ring-2 hover:ring-primary/40"
          />
          <div>
            <h2
              @click="$router.push(`/feed/${post.user.id}`)"
              class="text-base font-bold hover:cursor-pointer hover:text-primary hover:underline"
            >
              {{ post.user?.name }}
            </h2>
            <p class="mb-1 text-xs text-[#9B9893]">
              {{ convertDate(post.createdAt) }}
            </p>
          </div>
        </div>
        <p>{{ post.content }}</p>
        <div
          v-if="post.image"
          class="h-60 w-full overflow-hidden rounded-lg border-2 border-dark bg-light/50"
        >
          <img
            :src="post.image"
            @error="handleErrorImg"
            alt="post_image"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <div class="flex items-center gap-x-2">
          <button
            :class="[
              post.isLike ? 'isLike text-primary' : '',
              post.likes.length > 0 ? 'text-primary' : 'text-[#9B9893]',
            ]"
            @click="editLike(post.id, post.isLike)"
            type="button"
            class="material-symbols-outlined fill-red-500 text-2xl transition-all hover:scale-105"
          >
            thumb_up
          </button>
          <span v-if="post.likes.length > 0">{{
            toCurrency(post.likes.length)
          }}</span>
          <span v-else class="text-[#9B9893]">成為第一個按讚的朋友</span>
        </div>
        <div class="flex w-full items-center gap-x-2">
          <Avatar :image="userData.photo" :userName="userData.name" />
          <div class="flex w-full">
            <input
              v-model="post.currentComment"
              type="text"
              class="flex-grow-1 block w-full border-2 border-r-0 border-black px-4 py-1.5 placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              placeholder="留言..."
            />
            <button
              type="button"
              :disabled="!post.currentComment"
              @click="addComment(post.id)"
              class="btn-primary flex-none items-center rounded-none px-12 py-2"
            >
              留言
            </button>
          </div>
        </div>
        <div v-if="post.comments" class="space-y-4">
          <div
            v-for="comment in post.comments"
            :key="comment.id"
            class="rounded-xl bg-light/30 p-4"
          >
            <div class="flex gap-x-4">
              <Avatar
                :image="comment.user.photo"
                :userName="comment.user.name"
              />
              <div>
                <h3 class="text-base font-bold">
                  {{ comment.user.name }}
                </h3>
                <p class="mb-1 text-xs text-[#9B9893]">
                  {{ convertDate(comment.createdAt) }}
                </p>
                <p>{{ comment.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import {
  getPosts,
  createPostComment,
  addPostLike,
  deletePostLike,
} from '@/api';
import { convertDate, toCurrency } from '@/utils';
import { notifySuccess, notifyError } from '@/utils/notify';
import postDefaultImg from '@/assets/images/error_image.png';
import Loading from '@/components/Loading.vue';
import Avatar from '@/components/Avatar.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';

const store = useStore();
const options = [
  { key: 'desc', value: '最新貼文' },
  { key: 'asc', value: '最舊貼文' },
];
const isLoadingPage = ref(false);
const searchData = reactive({
  timeSort: options[0],
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
    q: searchData.q,
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
const handleErrorImg = (e) => {
  e.target.src = postDefaultImg;
};
const addComment = async (id) => {
  const post = posts.find((post) => post.id === id);
  const payload = {
    comment: post.currentComment,
  };
  const res = await createPostComment(id, payload);
  if (res.status === 'success') {
    notifySuccess('新增成功', '新增留言成功！');
    post.currentComment = null;
    fetchPosts();
    return;
  }
  notifyError('新增失敗', '新增留言失敗！');
};
const editLike = async (postId, isLike) => {
  const currentFunc = isLike ? deletePostLike : addPostLike;
  const res = await currentFunc(postId);
  if (res.status === 'success') {
    fetchPosts();
  }
};
</script>

<style lang="scss" scoped>
.isLike.material-symbols-outlined {
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
</style>
