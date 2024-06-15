<template>
  <div>
    <div
      class="card-shadow overflow-hidden rounded-lg border-2 border-dark bg-white"
    >
      <div class="border-b-2 border-dark p-4">
        <div class="flex gap-x-1.5">
          <div
            class="h-2 w-2 rounded-full border border-[#707070] bg-[#DE4B63]"
          />
          <div
            class="h-2 w-2 rounded-full border border-[#707070] bg-[#FAA722]"
          />
          <div
            class="h-2 w-2 rounded-full border border-[#707070] bg-[#83C51D]"
          />
        </div>
      </div>
      <p class="py-8 text-center text-[#9B9893]">
        <slot></slot>
      </p>
    </div>
  </div>
</template>
