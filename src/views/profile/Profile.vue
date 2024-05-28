<template>
  <section class="space-y-20">
    <h2
      class="relative border-2 border-dark bg-white p-4 text-center text-xl font-bold before:absolute before:-left-2 before:top-2 before:-z-[1] before:h-full before:w-full before:border-2 before:border-dark before:bg-white"
    >
      修改個人資料
    </h2>
    <div
      class="card-shadow relative rounded-lg border-2 border-dark bg-white p-8"
    >
      <div class="absolute left-4 top-0 flex -translate-y-full">
        <router-link :to="{ name: 'ProfileSettings' }" class="btn-outline-dark">
          暱稱修改
        </router-link>
        <router-link
          :to="{ name: 'ProfilePwdModify' }"
          class="btn-outline-dark -ml-0.5"
        >
          重設密碼
        </router-link>
      </div>
      <router-view />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.router-link-active {
  background-color: #000400;
  color: white;
}
</style>
