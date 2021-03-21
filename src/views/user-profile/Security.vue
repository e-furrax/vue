<template>
  <div class="space-y-14 my-16">
    <h1 class="font-bold text-2xl">Security Settings</h1>
    <hr class="border-white opacity-20" />
    <h2 class="font-semibold text-xl">Change Password</h2>
    <form class="space-y-16">
      <div class="space-y-5">
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="password-old" class="text-sm font-semibold"
            >Initial Password<span class="text-red-500 ml-1">*</span></label
          >
          <input type="password" id="password-old" class="h-10 p-4" />
        </div>
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="password-new" class="text-sm font-semibold"
            >New Password<span class="text-red-500 ml-1">*</span></label
          >
          <input type="password" id="password-new" class="h-10 p-4" />
        </div>
      </div>
      <div class="max-w-lg flex justify-end">
        <button
          class="bg-purple-700 rounded-full py-2 px-12 hover:bg-purple-600 transition-all duration-200"
        >
          Change Password
        </button>
      </div>
      <hr class="border-white opacity-20" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Security'
});
</script>

<style lang="postcss" scoped>
input,
textarea {
  @apply text-white bg-purple-1100 shadow-md border rounded-md;
  border-color: rgba(255, 255, 255, 0.2);
  resize: none !important;
}
</style>
