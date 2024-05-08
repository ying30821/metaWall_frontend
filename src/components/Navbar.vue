<template>
  <nav class="bg-white border-b-[3px] border-dark sticky top-0 left-0 z-10">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="font-paytone-one text-2xl">MetaWall</h1>
      <div class="flex gap-x-2.5">
        <div
          class="rounded-full w-[30px] h-[30px] border-2 border-dark overflow-hidden"
        >
          <img
            :src="userData.photo"
            alt="user_avatar"
            class="object-cover aspect-square"
          />
        </div>
        <p class="pb-1 border-b-2 border-dark font-bold">Member</p>
      </div>
    </div>
  </nav>
</template>

<script setup>
const userData = {
  name: '邊緣小杰',
  photo: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
};
</script>
