<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="card-shadow min-w-[500px] transform space-y-4 rounded-lg border-2 border-dark bg-white p-6 transition-all"
            >
              <div class="relative">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  編輯貼文
                </DialogTitle>
                <button
                  @click="closeModal"
                  type="button"
                  class="material-symbols-outlined absolute right-0 top-0 hover:text-gray-500"
                >
                  close
                </button>
              </div>
              <form @submit.prevent="handleEditPost" class="space-y-4">
                <textarea
                  v-model.trim="content"
                  id="content"
                  name="content"
                  rows="5"
                  cols="35"
                  placeholder="輸入您的貼文內容"
                  class="w-full border-2 border-dark p-4 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
                <div
                  v-if="post.image"
                  class="h-40 w-full overflow-hidden rounded-lg border-2 border-dark"
                >
                  <img
                    :src="post.image"
                    alt="post_image"
                    class="h-full w-full object-cover object-center"
                  />
                </div>
                <button
                  :disabled="!content"
                  type="submit"
                  class="mx-auto flex w-full justify-center rounded-lg border-2 border-dark bg-secondary px-4 py-3 text-center font-bold text-black hover:bg-secondary/80 disabled:cursor-not-allowed disabled:border-[#808080] disabled:bg-[#A8B0B9]"
                >
                  儲存
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { editPost } from '@/api';
import { notifySuccess, notifyError } from '@/utils/notify';

const props = defineProps({
  post: Object,
  isOpen: Boolean,
});
const emit = defineEmits(['update:isOpen', 'fetchData']);

const content = ref('');

onMounted(() => {
  content.value = props.post.content;
});

const closeModal = () => {
  emit('update:isOpen', false);
};
const handleEditPost = async () => {
  const payload = {
    content: content.value,
  };
  const res = await editPost(props.post.id, payload);
  if (res.status === 'success') {
    notifySuccess('編輯成功', '編輯貼文成功！');
    content.value = null;
    emit('fetchData');
    closeModal();
    return;
  }
  notifyError('編輯失敗', '編輯貼文失敗！');
};
</script>
