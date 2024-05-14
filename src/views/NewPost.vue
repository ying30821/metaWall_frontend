<template>
  <section class="space-y-4">
    <h2
      class="p-4 text-xl text-center relative border-2 before:top-2 before:-left-2 bg-white font-bold before:bg-white border-dark before:absolute before:w-full before:h-full before:-z-[1] before:border-2 before:border-dark"
    >
      張貼動態
    </h2>
    <form
      @submit.prevent="handleSubmitPost"
      class="rounded-lg bg-white p-8 border-2 border-dark space-y-4 card-shadow"
    >
      <div class="space-y-1">
        <label for="content" class="block mb-1">貼文內容</label>
        <textarea
          v-model.trim="v$.content.$model"
          id="content"
          name="content"
          rows="5"
          cols="35"
          placeholder="輸入您的貼文內容"
          class="border-2 border-dark w-full p-4 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
        />
        <div
          class="input-errors"
          v-for="error of v$.content.$errors"
          :key="error.$uid"
        >
          <div class="text-sm text-[#F57375] pl-1">{{ error.$message }}</div>
        </div>
      </div>
      <div class="space-y-1">
        <input
          v-model.trim="v$.imgUrl.$model"
          type="text"
          class="mb-4 block w-full py-1.5 px-4 border-2 border-black placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
          placeholder="圖片網址"
        />
        <div
          v-if="formData.imgUrl"
          class="border-2 border-dark rounded-lg overflow-hidden h-40 w-full"
        >
          <img
            :src="formData.imgUrl"
            alt="post_image"
            class="object-cover w-full"
          />
        </div>
        <div
          class="input-errors"
          v-for="error of v$.imgUrl.$errors"
          :key="error.$uid"
        >
          <div class="text-sm text-[#F57375] pl-1">{{ error.$message }}</div>
        </div>
      </div>
      <button
        type="submit"
        class="max-w-80 w-full font-bold p-4 mx-auto border-dark border-2 rounded-lg flex justify-center text-center bg-secondary text-black disabled:bg-[#A8B0B9] disabled:cursor-not-allowed disabled:border-[#808080] hover:bg-secondary/80"
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
      4000
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
      4000
    );
  }
};
</script>
