<template>
  <NotificationGroup group="generic">
    <div
      class="pointer-events-none fixed inset-0 z-50 flex items-start justify-end p-6 px-4 py-6"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            :class="
              notification.type === 'success'
                ? 'border-green-600 shadow-[-2px_2px_0px_#15803d]'
                : 'border-red-600 shadow-[-2px_2px_0px_#b91c1c]'
            "
            class="bg-white mt-4 border-2 flex w-full max-w-sm items-center gap-x-3 overflow-hidden rounded px-4 py-2"
          >
            <div
              :class="
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              "
              class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
            >
              <span class="material-symbols-outlined text-white">
                {{ notification.type === 'success' ? 'check' : 'close' }}
              </span>
            </div>
            <div>
              <h5
                :class="[
                  notification.type === 'success'
                    ? 'text-custom-success'
                    : 'text-custom-danger',
                ]"
                class="text-base"
              >
                {{ notification.title }}
              </h5>
              <p class="text-sm text-gray-700">{{ notification.text }}</p>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>
