<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div
      class="border-2 border-dark overflow-hidden px-6 py-8 lg:p-12 lg:py-16 max-w-[90%] flex items-center gap-x-8 shadow-[-6px_6px_0_-0_#00040029] bg-light xl:w-[52%] 2xl:w-[45%]"
    >
      <div
        class="bg-login w-60 h-60 lg:block lg:w-80 lg:h-80 bg-center bg-contain bg-no-repeat flex-shrink-0"
      />
      <div class="flex-1">
        <h1
          class="text-4xl lg:text-6xl text-primary font-paytone-one mb-2 text-center"
        >
          MetaWall
        </h1>
        <p class="text-lg text-center lg:text-2xl font-bold mb-4 lg:mb-9">
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
        <router-link to="/login" class="px-4 py-2 text-center w-full block">
          登入
        </router-link>
      </div>
    </div>
  </div>
</template>
