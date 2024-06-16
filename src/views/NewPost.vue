<template>
  <section class="space-y-4">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      張貼動態
    </h2>
    <form
      @submit.prevent="handleSubmitPost"
      class="card-shadow space-y-4 rounded-lg border-2 border-dark bg-white p-8"
    >
      <div class="space-y-1">
        <label for="content" class="mb-1 block">貼文內容</label>
        <textarea
          v-model.trim="v$.content.$model"
          id="content"
          name="content"
          rows="5"
          cols="35"
          placeholder="輸入您的貼文內容"
          class="w-full border-2 border-dark p-4 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
        />
        <div
          class="input-errors"
          v-for="error of v$.content.$errors"
          :key="error.$uid"
        >
          <p class="pl-1 text-sm text-[#F57375]">{{ error.$message }}</p>
        </div>
      </div>
      <div class="space-y-1">
        <input
          @change="handleSelectFile"
          type="file"
          id="file-input"
          accept="image/jpeg, image/png, image/jpg"
          ref="fileInputRef"
          class="hidden"
        />
        <label
          :class="isLoadingUpload ? 'pointer-events-none opacity-75' : ''"
          for="file-input"
          class="btn-dark mb-4 items-center"
        >
          <div
            v-if="isLoadingUpload"
            class="mr-1 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-secondary"
          />
          上傳圖片
        </label>
        <div
          v-if="postData.image"
          class="h-40 w-full overflow-hidden rounded-lg border-2 border-dark"
        >
          <img
            :src="postData.image"
            alt="post_image"
            class="h-full w-full object-cover object-center"
          />
        </div>
        <p v-if="isExceedFile" class="pl-1 text-sm text-[#F57375]">
          圖片檔案過大，僅限 1mb 以下檔案
        </p>
      </div>
      <button
        type="submit"
        class="mx-auto flex w-full max-w-80 justify-center rounded-lg border-2 border-dark bg-secondary p-4 text-center font-bold text-black hover:bg-secondary/80 disabled:cursor-not-allowed disabled:border-[#808080] disabled:bg-[#A8B0B9]"
      >
        送出貼文
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { createPost, uploadImage } from '@/api';
import { notifySuccess, notifyError } from '@/utils/notify';

const store = useStore();
const router = useRouter();
const image = ref(null);
const fileInputRef = ref(null);
const isExceedFile = ref(false);
const isLoadingUpload = ref(false);
const postData = reactive({
  content: null,
  image: null,
});
const postDataRules = {
  content: { required: helpers.withMessage('貼文內容不得為空', required) },
};
const v$ = useVuelidate(postDataRules, postData);

const userId = computed(() => store.state.userInfo.id);

const handleSubmitPost = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  const payload = {
    user: userId.value,
    content: postData.content,
    image: postData.image,
  };
  const res = await createPost(payload);
  if (res.status === 'success') {
    notifySuccess('新增成功', '新增貼文成功！');
    router.push('/feed');
  } else {
    notifyError('新增失敗', '新增貼文失敗！');
  }
};
const handleSelectFile = async () => {
  const selectedFile = fileInputRef.value.files[0];
  isExceedFile.value = false;
  postData.image = null;
  if (selectedFile) {
    // limit 1MB
    if (selectedFile.size > 1024 * 1024) {
      isExceedFile.value = true;
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    isLoadingUpload.value = true;
    const res = await uploadImage(formData);
    if (res.status === 'success') {
      postData.image = res.data;
      notifySuccess('上傳成功', '上傳圖片成功！');
    } else {
      notifyError('上傳失敗', '上傳圖片失敗！');
    }
    isLoadingUpload.value = false;
  }
};
</script>
