<template>
  <form
    @submit.prevent="handleSubmit"
    class="mx-auto flex flex-col items-center justify-center gap-y-4 lg:max-w-[60%]"
  >
    <div class="w-full space-y-1">
      <label for="password">輸入新密碼</label>
      <input
        v-model.trim="v$.password.$model"
        type="password"
        name="password"
        id="password"
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
    <div class="mb-8 w-full space-y-1">
      <label for="confirm_password">再次輸入</label>
      <input
        v-model.trim="v$.confirm_password.$model"
        type="password"
        name="confirm_password"
        id="confirm_password"
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
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { notify } from 'notiwind';
import { updatePassword } from '@/api';
import { passwordRegex } from '@/utils';

const router = useRouter();
const formData = reactive({
  password: null,
  confirm_password: null,
});
const validatePassword = helpers.regex(passwordRegex);
const validatePassword2 = (value) => value === formData.password;
const formDataRules = {
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
    password: formData.password,
    confirm_password: formData.confirm_password,
  };
  const res = await updatePassword(payload);
  if (res.status === 'success') {
    notify(
      {
        group: 'generic',
        title: '修改成功',
        text: '密碼修改成功',
        type: 'success',
      },
      4000,
    );
    formData.password = null;
    formData.confirm_password = null;
    v$.value.$reset();
    return;
  }
  notify(
    {
      group: 'generic',
      title: '修改失敗',
      text: '密碼修改失敗',
      type: 'error',
    },
    4000,
  );
};
</script>
