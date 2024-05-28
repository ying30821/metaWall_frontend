<template>
  <form
    @submit.prevent="handleSave"
    class="mx-auto flex flex-col items-center justify-center lg:max-w-[60%]"
  >
    <div class="mb-4 flex flex-col items-center">
      <Avatar
        :image="userData.photo"
        :userName="userData.name"
        class="mx-auto mb-4 h-20 w-20 lg:h-24 lg:w-24"
      />
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
        class="btn-dark mx-auto items-center"
      >
        <div
          v-if="isLoadingUpload"
          class="mr-1 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-secondary"
        />
        上傳大頭照</label
      >
      <p v-if="isExceedFile" class="pl-1 text-center text-sm text-[#F57375]">
        圖片檔案過大，僅限 1mb 以下檔案
      </p>
    </div>
    <div class="mb-4 w-full space-y-2">
      <label for="nickname" class="block text-dark">暱稱</label>
      <input
        v-model.trim="userData.name"
        type="text"
        name="nickname"
        id="nickname"
        class="form-input"
      />
    </div>
    <fieldset class="mb-8 w-full space-y-2">
      <legend for="sex" class="block text-dark">性別</legend>
      <div class="flex items-center gap-x-6">
        <div class="flex items-center gap-x-3">
          <input
            v-model="userData.sex"
            id="male"
            name="sex"
            type="radio"
            value="male"
            class="h-5 w-5 rounded-full border-2"
          />
          <label for="male" class="block text-dark">男性</label>
        </div>
        <div class="flex items-center gap-x-3">
          <input
            v-model="userData.sex"
            id="female"
            name="sex"
            type="radio"
            value="female"
            class="h-5 w-5 border-2 border-dark text-dark focus:ring-dark"
          />
          <label for="female" class="block text-dark">女性</label>
        </div>
      </div>
    </fieldset>
    <button
      type="submit"
      class="btn-primary w-full shadow-[-2px_2px_0px_#000400]"
    >
      送出更新
    </button>
  </form>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { notify } from 'notiwind';
import { getProfile, editProfile, uploadImage } from '@/api';
import Avatar from '@/components/Avatar.vue';

const store = useStore();
const fileInputRef = ref(null);
const isExceedFile = ref(false);
const isLoadingUpload = ref(false);
const userData = reactive({});

onMounted(() => {
  fetchProfile();
});

const fetchProfile = async () => {
  const res = await getProfile();
  Object.assign(userData, res.data.user);
};
const handleSave = async () => {
  const payload = {
    name: userData.name,
    sex: userData.sex,
    photo: userData.photo,
  };
  const res = await editProfile(payload);
  if (res.status === 'success') {
    notify(
      {
        group: 'generic',
        title: '修改成功',
        text: '修改資料成功！',
        type: 'success',
      },
      4000,
    );
    store.dispatch('setUserInfo');
  } else {
    notify(
      {
        group: 'generic',
        title: '修改失敗',
        text: '修改貼文失敗！',
        type: 'error',
      },
      4000,
    );
  }
};
const handleSelectFile = async () => {
  const selectedFile = fileInputRef.value.files[0];
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
      userData.photo = res.data;
      notify(
        {
          group: 'generic',
          title: '上傳成功',
          text: '上傳圖片成功！',
          type: 'success',
        },
        4000,
      );
    } else {
      notify(
        {
          group: 'generic',
          title: '上傳失敗',
          text: '上傳圖片失敗！',
          type: 'error',
        },
        4000,
      );
    }
    isLoadingUpload.value = false;
  }
};
</script>
