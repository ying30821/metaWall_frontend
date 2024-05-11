<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div
      class="border-2 border-dark p-12 py-16 flex gap-x-8 shadow-[-6px_6px_0_-0_#00040029] bg-light"
    >
      <div class="bg-login w-80 h-80 bg-center bg-contain bg-no-repeat" />
      <div>
        <h1 class="text-6xl text-primary font-paytone-one mb-2 text-center">
          MetaWall
        </h1>
        <p class="text-center text-2xl font-bold mb-9">
          到元宇宙展開全新交友圈
        </p>
        <form action="#" class="mb-2 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              class="block w-full border-0 py-3 text-gray-900 ring-2 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary px-5"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              class="block w-full border-0 py-3 text-gray-900 ring-2 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary px-5"
            />
          </div>
          <button
            disabled
            class="disabled:bg-gray-400 disabled:shadow-none disabled:border-gray-500/70 flex w-full p-4 justify-center rounded-lg bg-primary border-2 border-black px-4 py-3 text-white shadow-[-2px_2px_0_-0_rgba(0,0,0)] hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            登入
          </button>
        </form>
        <router-link to="/register" class="px-4 py-2 text-center w-full block">
          註冊帳號
        </router-link>
      </div>
    </div>
  </div>
</template>
