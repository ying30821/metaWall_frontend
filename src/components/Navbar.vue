<template>
  <nav class="bg-white border-b-[3px] border-dark sticky top-0 left-0 z-20">
    <div class="container mx-auto py-3 flex justify-between items-center">
      <h1 class="font-paytone-one text-2xl">MetaWall</h1>
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="flex gap-x-2.5">
          <div
            class="flex-shrink-0 rounded-full w-[30px] h-[30px] border-2 border-dark overflow-hidden"
          >
            <img
              :src="userData.photo"
              alt="user_avatar"
              class="object-cover aspect-square"
            />
          </div>
          <p class="pb-1 border-b-2 border-dark font-bold">Member</p>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div class="absolute right-0 w-56 mt-2">
            <div
              class="bg-white absolute -bottom-2 border-t-0 -right-2 w-full h-full -z-[1] border-2 border-dark"
            />
            <MenuItems
              class="origin-top-right divide-y-2 divide-dark bg-white text-center border-2 border-dark focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-dark']"
                  class="w-full px-4 py-2"
                >
                  我的貼文牆
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-dark']"
                  class="w-full px-4 py-2"
                >
                  修改個人資料
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-gray-900']"
                  class="w-full px-4 py-2"
                >
                  登出
                </button>
              </MenuItem>
            </MenuItems>
          </div>
        </transition>
      </Menu>
    </div>
  </nav>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { compileTemplate } from 'vue/compiler-sfc';

const userData = {
  name: '邊緣小杰',
  photo: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
};
</script>
