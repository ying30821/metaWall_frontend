<template>
  <Loading :isLoading="isLoadingPage" />
  <div class="flex items-stretch mb-4 gap-x-3">
    <Listbox as="div" v-model="searchData.timeSort">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-default bg-white h-full py-2.5 pl-4 min-w-40 pr-10 ring-2 ring-inset ring-dark focus:outline-none focus:ring-2 focus:ring-primary text-left"
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
        class="block w-full flex-grow-1 py-1.5 px-4 border-2 border-r-0 border-black placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
        placeholder="搜尋貼文"
      />
      <button
        @click="fetchPosts"
        type="button"
        class="btn-primary px-3 py-2 rounded-none flex-none"
      >
        <span class="material-symbols-outlined">search</span>
      </button>
    </div>
  </div>
  <section>
    <div v-if="posts.length === 0">
      <div
        class="bg-white card-shadow border-2 border-dark rounded-lg overflow-hidden"
      >
        <div class="border-b-2 border-dark p-4">
          <div class="flex gap-x-1.5">
            <div
              class="rounded-full w-2 h-2 border border-[#707070] bg-[#DE4B63]"
            />
            <div
              class="rounded-full w-2 h-2 border border-[#707070] bg-[#FAA722]"
            />
            <div
              class="rounded-full w-2 h-2 border border-[#707070] bg-[#83C51D]"
            />
          </div>
        </div>
        <p class="text-center text-[#9B9893] py-8">
          目前尚無動態，新增一則貼文吧！
        </p>
      </div>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="post in posts"
        :key="post"
        class="bg-white card-shadow border-2 border-dark rounded-lg overflow-hidden p-6 space-y-4 lg:px-10"
      >
        <div class="flex items-center gap-x-4">
          <div
            class="flex-shrink-0 rounded-full w-11 h-11 border-2 border-dark overflow-hidden bg-light"
          >
            <img
              v-if="post.user?.photo"
              :src="post.user?.photo"
              alt="user_avatar"
              class="object-cover aspect-square"
            />
          </div>
          <div>
            <h2 class="text-base font-bold">{{ post.user?.name }}</h2>
            <p class="text-xs text-[#9B9893] mb-1">
              {{ convertDate(post.createdAt) }}
            </p>
          </div>
        </div>
        <p>{{ post.content }}</p>
        <img
          v-if="post.image"
          :src="post.image"
          alt="post_image"
          class="border-2 border-dark rounded-lg object-cover max-h-40 w-full"
        />
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
        <div class="flex items-center gap-x-2 w-full">
          <div
            class="flex-shrink-0 rounded-full w-10 h-10 border-2 border-dark overflow-hidden bg-light"
          >
            <img
              v-if="post.user?.photo"
              :src="post.user?.photo"
              alt="user_avatar"
              class="object-cover aspect-square"
            />
          </div>
          <div class="flex w-full">
            <input
              type="text"
              class="block w-full flex-grow-1 py-1.5 px-4 border-2 border-r-0 border-black placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              placeholder="留言..."
            />
            <button
              type="button"
              disabled
              class="btn-primary px-12 py-2 rounded-none flex-none items-center"
            >
              <div v-if="isLoadingSubmit">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary mr-1.5"
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
            class="p-4 rounded-xl bg-light/30"
          >
            <div class="flex gap-x-4">
              <div
                class="flex-shrink-0 rounded-full w-11 h-11 border-2 border-dark overflow-hidden"
              >
                <img
                  :src="comment.user.photo"
                  alt="user_avatar"
                  class="object-cover aspect-square"
                />
              </div>
              <div>
                <h3 class="text-base font-bold">
                  {{ comment.user.name }}
                </h3>
                <p class="text-xs text-[#9B9893] mb-1">
                  {{ convertDate(comment.createdAt) }}
                </p>
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { getPosts } from '@/api';
import Loading from '@/components/Loading.vue';

const options = [
  { key: 'desc', value: '最新貼文' },
  { key: 'asc', value: '最舊貼文' },
];
const tempPostData = [
  {
    user: {
      name: '邊緣小杰',
      photo: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
    },
    content: '外面看起來就超冷.... 我決定回被窩繼續睡....>.<',
    image: 'https://fakeimg.pl/400x200/?retina=1&text=こんにちは&font=noto',
    likes: 10,
    comments: [
      {
        id: 1,
        user: {
          name: '西林',
          photo: 'https://fakeimg.pl/250x100/ff0000/',
        },
        content: '真的～我已經準備冬眠了',
        createdAt: '2024-05-08T14:45:59.587Z',
      },
      {
        id: 1,
        user: {
          name: '西林',
          photo: 'https://fakeimg.pl/250x100/ff0000/',
        },
        content: '真的～我已經準備冬眠了',
        createdAt: '2024-05-08T14:45:59.587Z',
      },
    ],
    createdAt: '2024-05-08T14:45:59.587Z',
  },
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
  () => fetchPosts()
);
onMounted(() => fetchPosts());

const convertDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formatDate =
    year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;

  return formatDate;
};
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
</script>
