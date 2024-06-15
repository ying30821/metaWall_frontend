<template>
  <div class="flex-1">
    <h1
      class="mb-2 text-center font-paytone-one text-4xl text-primary lg:text-6xl"
    >
      MetaWall
    </h1>
    <p class="mb-4 text-center text-lg font-bold lg:mb-9 lg:text-2xl">註冊</p>
    <form @submit.prevent="handleSubmit" class="mb-2 space-y-4">
      <div>
        <input
          v-model.trim="v$.name.$model"
          type="text"
          placeholder="暱稱"
          class="form-input"
        />
        <div
          class="input-errors"
          v-for="error of v$.name.$errors"
          :key="error.$uid"
        >
          <div class="pl-1 text-sm text-[#F57375]">
            {{ error.$message }}
          </div>
        </div>
      </div>
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
      <div>
        <input
          v-model.trim="v$.confirm_password.$model"
          type="password"
          placeholder="Confirm Password"
          class="form-input"
        />
        <div
          class="input-errors"
          v-for="error of v$.confirm_password.$errors"
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
        註冊
      </button>
    </form>
    <router-link to="/login" class="block w-full px-4 py-2 text-center">
      登入
    </router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { signUp } from '@/api';
import { passwordRegex } from '@/utils';
import { notifyError } from '@/utils/notify';

const router = useRouter();
const formData = reactive({
  name: null,
  email: null,
  password: null,
  confirm_password: null,
});
const validatePassword = helpers.regex(passwordRegex);
const validatePassword2 = (value) => value === formData.password;
const formDataRules = {
  name: {
    required: helpers.withMessage('暱稱不得為空', required),
    minLength: helpers.withMessage('暱稱至少 2 個字元以上', minLength(2)),
  },
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
  confirm_password: {
    required: helpers.withMessage('密碼不得為空', required),
    validatePassword2: helpers.withMessage('密碼不一致', validatePassword2),
  },
};
const v$ = useVuelidate(formDataRules, formData);

const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (!result) return;
  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirm_password: formData.confirm_password,
  };
  const res = await signUp(payload);
  if (res.status === 'success') {
    router.push('/login');
    return;
  }
  if (res.error.response.status === 409) {
    notifyError('註冊失敗', '帳號已被註冊，請替換新的 Email');
    return;
  }
  notifyError('註冊失敗', '請洽管理員');
};
</script>
