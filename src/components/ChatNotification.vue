<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center mr-4">
      <img src="/images/avatar1.png" class="rounded-full" width="50" height="50" />
      <div class="ml-4 flex flex-col items-start">
        <h1 class="font-bold">{{ message.fromUser.username }}</h1>
        <span class="trim">{{ message.content }}</span>
      </div>
    </div>
    <div class="flex flex-col items-end justify-between">
      <span>now</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatNotification',
  props: {
    message: Object
  }
});
</script>

<style lang="postcss" scoped>
.Vue-Toastification__toast--default {
  background-color: red !important;
}

.trim {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
