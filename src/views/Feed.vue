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
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { getPosts } from '@/api';
import Loading from '@/components/Loading.vue';
import EmptyContentCard from '@/components/EmptyContentCard.vue';
import PostCard from '@/components/PostCard.vue';

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
</script>
