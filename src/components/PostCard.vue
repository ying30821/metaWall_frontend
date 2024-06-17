<template>
  <div
    class="card-shadow space-y-4 rounded-lg border-2 border-dark bg-white p-6 lg:px-10"
  >
    <div class="flex items-center justify-between">
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
      <Popover
        v-if="post.user.id === userData.id"
        v-slot="{ open }"
        class="relative"
      >
        <PopoverButton
          class="p-1 text-base text-gray-800 hover:text-gray-500 focus:outline-none"
        >
          <span class="material-symbols-outlined block"> more_horiz </span>
        </PopoverButton>
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel class="absolute right-0 z-10 mt-1 w-40">
            <div
              class="card-shadow overflow-hidden rounded-lg border-2 border-dark shadow-lg"
            >
              <ul class="space-y-2 bg-light px-2 py-4">
                <li
                  @click="openModal(post)"
                  class="flex items-center gap-x-1.5 rounded-md p-1 hover:cursor-pointer hover:bg-gray-50"
                >
                  <span class="material-symbols-outlined text-xl"> edit </span>
                  編輯貼文
                </li>
                <li
                  @click="handleDeletePost(post.id)"
                  class="flex items-center gap-x-1.5 rounded-md p-1 hover:cursor-pointer hover:bg-gray-50"
                >
                  <span class="material-symbols-outlined text-xl">
                    delete
                  </span>
                  刪除貼文
                </li>
              </ul>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
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
      <span v-if="post.likes.length > 0">
        {{ toCurrency(post.likes.length) }}
      </span>
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
          @click="handleAddComment(post.id)"
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
        class="flex items-start justify-between rounded-xl bg-light/30 p-4"
      >
        <div class="flex gap-x-4">
          <Avatar
            :image="comment.user.photo"
            :userName="comment.user.name"
            @click="$router.push(`/feed/${comment.user.id}`)"
            class="hover:cursor-pointer hover:ring-2 hover:ring-primary/40"
          />
          <div>
            <h3
              @click="$router.push(`/feed/${comment.user.id}`)"
              class="text-base font-bold hover:cursor-pointer hover:text-primary hover:underline"
            >
              {{ comment.user.name }}
            </h3>
            <p class="mb-1 text-xs text-[#9B9893]">
              {{ convertDate(comment.createdAt) }}
            </p>
            <div v-if="isEditComment">
              <div class="flex items-center gap-x-2">
                <input
                  v-model="tempComment.comment"
                  @keyup.esc="() => (isEditComment = false)"
                  @keyup.enter="confirmEditComment"
                  class="form-input rounded-lg bg-stone-200 py-1.5 ring-0 focus:ring-0"
                />
                <span
                  @click="confirmEditComment"
                  class="material-symbols-outlined text-xl"
                >
                  send
                </span>
              </div>
              <p class="mt-0.5 text-xs text-gray-400">按 Esc 鍵可取消</p>
            </div>
            <p v-else>{{ comment.comment }}</p>
          </div>
        </div>
        <Popover
          v-if="comment.user.id === userData.id"
          v-slot="{ open }"
          class="relative"
        >
          <PopoverButton
            class="p-1 text-base text-gray-800 hover:text-gray-500 focus:outline-none"
          >
            <span class="material-symbols-outlined block"> more_horiz </span>
          </PopoverButton>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel class="absolute right-0 z-10 mt-1 w-24">
              <div
                class="card-shadow overflow-hidden rounded-lg border-2 border-dark shadow-lg"
              >
                <ul class="space-y-0.5 bg-light px-2 py-1.5">
                  <li
                    @click="handleEditComment(comment)"
                    class="flex items-center gap-x-1.5 rounded-md p-0.5 text-sm hover:cursor-pointer hover:bg-gray-50"
                  >
                    <span class="material-symbols-outlined text-lg">
                      edit
                    </span>
                    編輯
                  </li>
                  <li
                    @click="handleDeleteComment(comment.id)"
                    class="flex items-center gap-x-1.5 rounded-md p-0.5 text-sm hover:cursor-pointer hover:bg-gray-50"
                  >
                    <span class="material-symbols-outlined text-lg">
                      delete
                    </span>
                    刪除
                  </li>
                </ul>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>
  </div>
  <PostModal
    v-if="isOpenModal"
    v-model:isOpen="isOpenModal"
    :isOpen="isOpenModal"
    :post="currentPost"
    @fetchData="emit('fetchData')"
  />
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import {
  createPostComment,
  editPostComment,
  deletePostComment,
  addPostLike,
  deletePostLike,
  deletePost,
} from '@/api';
import { convertDate, toCurrency } from '@/utils';
import { notifySuccess, notifyError } from '@/utils/notify';
import postDefaultImg from '@/assets/images/error_image.png';
import Avatar from '@/components/Avatar.vue';
import PostModal from '@/components/PostModal.vue';

const props = defineProps({
  post: Object,
});
const emit = defineEmits(['fetchData']);

const store = useStore();
const isEditComment = ref(false);
const isOpenModal = ref(false);
const tempComment = reactive({
  id: null,
  comment: null,
});
const currentPost = reactive({});

const userData = computed(() => store.state.userInfo);

const handleErrorImg = (e) => {
  e.target.src = postDefaultImg;
};
const handleAddComment = async (id) => {
  const payload = {
    comment: props.post.currentComment,
  };
  const res = await createPostComment(id, payload);
  if (res.status === 'success') {
    notifySuccess('新增成功', '新增留言成功！');
    props.post.currentComment = null;
    emit('fetchData');
    return;
  }
  notifyError('新增失敗', '新增留言失敗！');
};
const handleEditComment = (comment) => {
  tempComment.comment = comment.comment;
  tempComment.id = comment.id;
  isEditComment.value = true;
};
const handleDeleteComment = async (id) => {
  const res = await deletePostComment(id);
  if (res.status === 'success') {
    notifySuccess('刪除成功', '刪除留言成功！');
    emit('fetchData');
    return;
  }
  notifyError('刪除失敗', '刪除留言失敗！');
};
const editLike = async (postId, isLike) => {
  const currentFunc = isLike ? deletePostLike : addPostLike;
  const res = await currentFunc(postId);
  if (res.status === 'success') {
    emit('fetchData');
  }
};
const confirmEditComment = async () => {
  const payload = {
    comment: tempComment.comment,
  };
  const res = await editPostComment(tempComment.id, payload);
  if (res.status === 'success') {
    emit('fetchData');
    tempComment.comment = null;
    tempComment.id = null;
    isEditComment.value = false;
  }
};
const openModal = (post) => {
  isOpenModal.value = true;
  Object.assign(currentPost, post);
};
const handleDeletePost = async (id) => {
  const res = await deletePost(id);
  if (res.status === 'success') {
    notifySuccess('刪除成功', '刪除貼文成功！');
    emit('fetchData');
    return;
  }
  notifyError('刪除失敗', '刪除貼文失敗！');
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
