<template>
  <nav class="sticky left-0 top-0 z-20 border-b-[3px] border-dark bg-white">
    <div class="container mx-auto flex items-center justify-between py-3">
      <h1
        @click="$router.push('/')"
        class="cursor-pointer font-paytone-one text-2xl"
      >
        MetaWall
      </h1>
      <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="flex gap-x-2.5">
          <Avatar
            v-if="userData"
            :image="userData.photo"
            :userName="userData.name"
            class="h-[30px] w-[30px] text-sm"
          />
          <p v-if="userData" class="border-b-2 border-dark pb-1 font-bold">
            {{ userData.name }}
          </p>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div class="absolute right-0 mt-2 w-56">
            <div
              class="absolute -bottom-2 -right-2 -z-[1] h-full w-full border-2 border-t-0 border-dark bg-white"
            />
            <MenuItems
              class="origin-top-right divide-y-2 divide-dark border-2 border-dark bg-white text-center focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-dark']"
                  @click="router.push('/')"
                  class="w-full px-4 py-2"
                >
                  我的貼文牆
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-dark']"
                  @click="router.push('/profile')"
                  class="w-full px-4 py-2"
                >
                  修改個人資料
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[active ? 'bg-light' : 'text-gray-900']"
                  @click="store.dispatch('setLogout')"
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import Avatar from './Avatar.vue';

const router = useRouter();
const store = useStore();

const userData = computed(() => store.state.userInfo);
</script>
