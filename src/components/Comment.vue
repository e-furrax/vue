<template>
  <div class="comment py-2 px-3 w-full rounded-sm bg-purple-1100 text-white relative">
    <div class="flex items-start">
      <img
        src="/images/avatar1.png"
        class="rounded-full border border-yellow-800 z-20"
        width="38"
        height="38"
      />
      <div class="ml-2">
        <div class="flex items-center">
          <span class="font-bold mr-1">{{ comment.author }}</span>
          <img v-for="index of Array(5)" :key="index" src="/images/icons/star.svg" width="14" />
        </div>
        <div class="text-gray-300 text-xs mb-2">2 hours ago</div>
      </div>
    </div>
    <p class="description text-sm">
      {{ comment.message }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Comment',
  props: {
    comment: Object
  }
});
</script>

<style scoped></style>
