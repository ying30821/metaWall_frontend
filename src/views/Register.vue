<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div
      class="flex max-w-[90%] items-center gap-x-8 overflow-hidden border-2 border-dark bg-light px-6 py-8 shadow-[-6px_6px_0_-0_#00040029] lg:p-12 lg:py-16 xl:w-[52%] 2xl:w-[45%]"
    >
      <div
        class="h-60 w-60 flex-shrink-0 bg-login bg-contain bg-center bg-no-repeat lg:block lg:h-80 lg:w-80"
      />
      <div class="flex-1">
        <h1
          class="mb-2 text-center font-paytone-one text-4xl text-primary lg:text-6xl"
        >
          MetaWall
        </h1>
        <p class="mb-4 text-center text-lg font-bold lg:mb-9 lg:text-2xl">
          註冊
        </p>
        <form action="#" class="mb-2 space-y-4">
          <div>
            <input type="text" placeholder="暱稱" class="form-input" />
          </div>
          <div>
            <input type="email" placeholder="Email" class="form-input" />
          </div>
          <div>
            <input type="password" placeholder="Password" class="form-input" />
          </div>
          <button class="btn-primary w-full shadow-[-2px_2px_0_-0_rgba(0,0,0)]">
            註冊
          </button>
        </form>
        <router-link to="/login" class="block w-full px-4 py-2 text-center">
          登入
        </router-link>
      </div>
    </div>
  </div>
</template>
