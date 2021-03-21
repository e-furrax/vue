<template>
  <div class="space-y-12 my-16">
    <h1 class="font-bold text-2xl">Account Settings</h1>
    <hr class="border-white opacity-20" />
    <h2 class="font-semibold text-xl">Personal Informations</h2>
    <form class="space-y-16">
      <div class="space-y-5">
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="name" class="text-sm font-semibold">Name</label>
          <input type="text" id="name" class="h-10 p-4" />
        </div>
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="email" class="text-sm font-semibold">Email Address</label>
          <input type="text" id="email" class="h-10 p-4" />
        </div>
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="bio" class="text-sm font-semibold" maxlength="200">Bio</label>
          <textarea
            id="bio"
            rows="2"
            class="p-4 placeholder-gray-500 placeholder-opacity-70"
            placeholder="Write a short bio to introduce yourself"
          ></textarea>
        </div>
      </div>
      <hr class="border-white opacity-20" />
      <div class="max-w-lg flex justify-between">
        <button>Discard Changes</button>
        <button
          class="bg-purple-700 rounded-full py-2 px-12 hover:bg-purple-600 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Account'
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
