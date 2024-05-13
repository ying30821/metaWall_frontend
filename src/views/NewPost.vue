<template>
  <section class="space-y-4">
    <h2
      class="p-4 text-xl text-center relative border-2 before:top-2 before:-left-2 bg-white font-bold before:bg-white border-dark before:absolute before:w-full before:h-full before:-z-[1] before:border-2 before:border-dark"
    >
      張貼動態
    </h2>
    <div
      class="rounded-lg bg-white p-8 border-2 border-dark space-y-4 card-shadow"
    >
      <label for="content" class="block mb-1">貼文內容</label>
      <textarea
        id="content"
        name="content"
        rows="5"
        cols="35"
        placeholder="輸入您的貼文內容"
        class="border-2 border-dark w-full p-4 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
      />
      <input
        type="text"
        class="block w-full py-1.5 px-4 border-2 border-black placeholder:text-gray-500 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-blue-500"
        placeholder="圖片網址"
      />
      <div class="border-2 border-dark rounded-lg overflow-hidden h-40 w-full">
        <img alt="" class="object-cover w-full" />
      </div>

      <button
        type="button"
        class="max-w-80 w-full font-bold p-4 mx-auto border-dark border-2 rounded-lg flex justify-center text-center bg-secondary text-black disabled:bg-[#A8B0B9] disabled:cursor-not-allowed disabled:border-[#808080] hover:bg-secondary/80"
      >
        送出貼文
      </button>
    </div>
  </section>
</template>
