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
          <span class="font-bold mr-2">{{ comment.fromUser.username }}</span>
          <div class="flex items-center">
            <img src="/images/icons/star.svg" width="14" />
            <span class="text-sm ml-1">
              {{ comment.rating }}
            </span>
          </div>
        </div>
        <div class="text-gray-300 text-xs mb-2">
          {{ timeDifference(Date.now(), new Date(comment.createdAt).getTime()) }}
        </div>
      </div>
    </div>
    <p class="description text-sm">
      {{ comment.comments }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Comment',
  props: {
    comment: Object
  },
  methods: {
    timeDifference(current: number, previous: number) {
      const msPerMinute = 60 * 1000;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;

      const elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return 'just now';
      } else if (elapsed < msPerHour) {
        return `${Math.round(elapsed / msPerMinute)} minutes ago`;
      } else if (elapsed < msPerDay) {
        return `${Math.round(elapsed / msPerHour)} hours ago`;
      } else if (elapsed < msPerMonth) {
        return `${Math.round(elapsed / msPerDay)} days ago`;
      } else if (elapsed < msPerYear) {
        return `${Math.round(elapsed / msPerMonth)} months ago`;
      } else {
        return `${Math.round(elapsed / msPerYear)} years ago`;
      }
    }
  }
});
</script>

<style scoped></style>
