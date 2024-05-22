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
          <div class="pl-1 text-sm text-[#F57375]">{{ error.$message }}</div>
        </div>
      </div>
      <div class="space-y-1">
        <input
          v-model.trim="v$.imgUrl.$model"
          type="text"
          class="mb-4 block w-full border-2 border-black px-4 py-1.5 placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
          placeholder="圖片網址"
        />
        <div
          v-if="formData.imgUrl"
          class="h-40 w-full overflow-hidden rounded-lg border-2 border-dark"
        >
          <img
            :src="formData.imgUrl"
            alt="post_image"
            class="w-full object-cover"
          />
        </div>
        <div
          class="input-errors"
          v-for="error of v$.imgUrl.$errors"
          :key="error.$uid"
        >
          <div class="pl-1 text-sm text-[#F57375]">{{ error.$message }}</div>
        </div>
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
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { notify } from 'notiwind';
import { required, helpers } from '@vuelidate/validators';
import { createPost } from '@/api';

const formData = reactive({
  user: '663f77b111456536a3eb5515',
  content: null,
  imgUrl: null,
});
const validateClient = (value) => !value || value.startsWith('https');
const formDataRules = {
  user: { required: helpers.withMessage('user id 不得為空', required) },
  content: { required: helpers.withMessage('貼文內容不得為空', required) },
  imgUrl: {
    validateClient: helpers.withMessage('開頭需為 https', validateClient),
  },
};
const v$ = useVuelidate(formDataRules, formData);

const handleSubmitPost = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  const payload = {
    user: formData.user,
    content: formData.content,
    ...(formData.imgUrl && { image: formData.imgUrl }),
  };
  const res = await createPost(payload);
  if (res.status === 'success') {
    notify(
      {
        group: 'generic',
        title: '新增成功',
        text: '新增貼文成功！',
        type: 'success',
      },
      4000,
    );
    formData.content = null;
    formData.imgUrl = null;
    v$.value.$reset();
  } else {
    notify(
      {
        group: 'generic',
        title: '新增失敗',
        text: '新增貼文失敗！',
        type: 'error',
      },
      4000,
    );
  }
};
</script>
