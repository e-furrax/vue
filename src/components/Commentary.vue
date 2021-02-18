<template>
  <div
    class="pb-1.5 px-3 mt-2 w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-purple-1100 text-white mx-6 lg:mx-0"
  >
    <p class="text-xs pt-8 lg:pt-2">
      From: <span class="text-4xl font-bold"> {{ commentary.author }}</span
      >:
    </p>
    <div class="flex flex-col text-left pl-2 w-full">
      <hr class="border-gray-400 my-2 w-full" />
      <p class="description text-sm">
        {{ commentary.message }}
      </p>
      <hr class="border-gray-400 my-2 w-full" />
      <div class="">
        <router-link to="/report" class="underline float-left">Report comment to moderation</router-link>
        <p class="float-right font-bold">5★</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Commentary',
  props: {
    commentary: Object
  }
});
</script>

<style scoped></style>
