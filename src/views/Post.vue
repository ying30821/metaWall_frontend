<template>
  <Loading :isLoading="isLoadingPage" />
  <section>
    <div
      v-if="Object.keys(post).length > 0"
      class="card-shadow space-y-4 overflow-hidden rounded-lg border-2 border-dark bg-white p-6 lg:px-10"
    >
      <div class="flex items-center gap-x-4">
        <Avatar
          :image="post.user.photo"
          :userName="post.user.name"
          @click="$router.push(`/feed/${post.user._id}`)"
          class="h-11 w-11 hover:cursor-pointer hover:ring-2 hover:ring-primary/40"
        />
        <div>
          <h2
            @click="$router.push(`/feed/${post.user._id}`)"
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
          @click="editLike(post.isLike)"
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
            @click="addComment()"
            class="btn-primary flex-none items-center rounded-none px-12 py-2"
          >
            留言
          </button>
        </div>
      </div>
      <div v-if="post.comments" class="space-y-4">
        <div
          v-for="comment in post.comments"
          :key="comment._id"
          class="rounded-xl bg-light/30 p-4"
        >
          <div class="flex gap-x-4">
            <Avatar :image="comment.user.photo" :userName="comment.user.name" />
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
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { getPost, createPostComment, addPostLike, deletePostLike } from '@/api';
import { convertDate, toCurrency } from '@/utils';
import { notifySuccess, notifyError } from '@/utils/notify';
import postDefaultImg from '@/assets/images/error_image.png';
import Loading from '@/components/Loading.vue';
import Avatar from '@/components/Avatar.vue';

const props = defineProps({
  postId: String,
});

const router = useRouter();
const store = useStore();
const isLoadingPage = ref(false);
const post = reactive({});

const userData = computed(() => store.state.userInfo);

onMounted(() => fetchPost());

const fetchPost = async () => {
  isLoadingPage.value = true;
  const res = await getPost(props.postId);
  if (res?.status === 'success') {
    res.data.isLike = res.data.likes.some(
      (like) => like.user === userData.value._id,
    );
    Object.assign(post, res.data);
    isLoadingPage.value = false;
    return;
  }
  router.go(-1);
};
const handleErrorImg = (e) => {
  e.target.src = postDefaultImg;
};
const addComment = async (id) => {
  const payload = {
    comment: post.currentComment,
  };
  const res = await createPostComment(props.postId, payload);
  if (res.status === 'success') {
    notifySuccess('新增成功', '新增留言成功！');
    post.currentComment = null;
    fetchPost();
    return;
  }
  notifyError('新增失敗', '新增留言失敗！');
};
const editLike = async (isLike) => {
  const currentFunc = isLike ? deletePostLike : addPostLike;
  const res = await currentFunc(props.postId);
  if (res.status === 'success') {
    fetchPost();
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
