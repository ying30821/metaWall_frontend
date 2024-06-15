<template>
  <div class="flex-1">
    <h1
      class="mb-2 text-center font-paytone-one text-4xl text-primary lg:text-6xl"
    >
      MetaWall
    </h1>
    <p class="mb-4 text-center text-lg font-bold lg:mb-9 lg:text-2xl">
      到元宇宙展開全新交友圈
    </p>
    <form @submit.prevent="handleSubmit" class="mb-2 space-y-4">
      <div>
        <input
          v-model.trim="v$.email.$model"
          type="email"
          placeholder="Email"
          class="form-input"
        />
        <div
          class="input-errors"
          v-for="error of v$.email.$errors"
          :key="error.$uid"
        >
          <div class="pl-1 text-sm text-[#F57375]">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <input
          v-model.trim="v$.password.$model"
          type="password"
          placeholder="Password"
          class="form-input"
        />
        <div
          class="input-errors"
          v-for="error of v$.password.$errors"
          :key="error.$uid"
        >
          <div class="pl-1 text-sm text-[#F57375]">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn-primary w-full shadow-[-2px_2px_0_-0_rgba(0,0,0)]"
      >
        登入
      </button>
    </form>
    <router-link to="/register" class="block w-full px-4 py-2 text-center">
      註冊帳號
    </router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { notify } from 'notiwind';
import { signIn } from '@/api';
import { passwordRegex } from '@/utils';

const router = useRouter();
const store = useStore();
const formData = reactive({
  email: null,
  password: null,
});
const validatePassword = helpers.regex(passwordRegex);
const formDataRules = {
  email: {
    required: helpers.withMessage('信箱不得為空', required),
    email: helpers.withMessage('信箱格式錯誤', email),
  },
  password: {
    required: helpers.withMessage('密碼不得為空', required),
    validatePassword: helpers.withMessage(
      '密碼需至少 8 碼以上，並中英混合',
      validatePassword,
    ),
  },
};
const v$ = useVuelidate(formDataRules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  const payload = {
    email: formData.email,
    password: formData.password,
  };
  const res = await signIn(payload);
  if (res.status === 'success') {
    store.dispatch('setLogin', res.data.user.token);
    router.push('/feed');
    return;
  }
  notify(
    {
      group: 'generic',
      title: '登入失敗',
      text: '帳號或密碼錯誤',
      type: 'error',
    },
    4000,
  );
};
</script>
