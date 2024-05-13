<template>
  <div
    class="px-6 py-8 border-2 border-dark sticky right-0 top-20 w-[320px] space-y-6 bg-white h-fit z-10"
  >
    <button
      @click="$router.push('/new-post')"
      type="button"
      class="btn-primary shadow-[-2px_2px_0px_#000400] w-full"
    >
      張貼動態
    </button>
    <div class="space-y-[22px]">
      <router-link to="/" class="flex items-center gap-x-4 group">
        <div
          class="flex-shrink-0 border-2 border-dark bg-[#E2EDFA] rounded-full inline-flex items-center justify-center w-[50px] h-[50px] overflow-hidden group-hover:border-primary"
        >
          <img
            :src="userData.photo"
            alt="user_avatar"
            class="object-cover aspect-square"
          />
        </div>
        <p class="font-bold group-hover:text-primary">{{ userData.name }}</p>
      </router-link>
      <router-link to="/" class="flex items-center gap-x-4 group">
        <div
          class="flex-shrink-0 border-2 border-dark bg-[#E2EDFA] rounded-full inline-flex items-center justify-center w-[50px] h-[50px] overflow-hidden group-hover:bg-primary"
        >
          <span
            class="material-symbols-outlined text-3xl text-black group-hover:text-white"
          >
            notifications
          </span>
        </div>
        <p class="font-bold group-hover:text-primary">追蹤清單</p>
      </router-link>
      <router-link to="/" class="flex items-center gap-x-4 group">
        <div
          class="flex-shrink-0 border-2 border-dark bg-[#E2EDFA] rounded-full inline-flex items-center justify-center w-[50px] h-[50px] overflow-hidden group-hover:bg-primary"
        >
          <span
            class="material-symbols-outlined text-2xl text-black group-hover:text-white"
          >
            thumb_up
          </span>
        </div>
        <p class="font-bold group-hover:text-primary">我按讚的文章</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const userData = {
  name: '邊緣小杰',
  photo: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
};
</script>
