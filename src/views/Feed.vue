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
            class="h-11 w-11"
          />
          <div>
            <h2 class="text-base font-bold">{{ post.user?.name }}</h2>
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
          <span
            :class="post.likes > 0 ? 'text-primary' : 'text-[#9B9893]'"
            class="material-symbols-outlined text-2xl"
          >
            thumb_up
          </span>
          <span v-if="post.likes > 0">{{ post.likes }}</span>
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
              <div v-if="isLoadingSubmit">
                <svg
                  aria-hidden="true"
                  class="mr-1.5 h-5 w-5 animate-spin fill-primary text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
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
import { getPosts, createPostComment } from '@/api';
import { convertDate } from '@/utils';
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
const isLoadingSubmit = ref(false);
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
  posts.push(...res.data);
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
</script>
