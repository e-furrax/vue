<template>
  <div
    class="transform hover:scale-105 transition duration-200 text-white
    flex flex-col items-start p-4 rounded border border-pink-500 bg-pink-600 bg-opacity-90"
  >
    <img :src="icon" width="30" />
    <div class="mt-2 flex flex-col items-start">
      <span class="text-xl">{{ items && items.length }}</span>
      <span class="text-xs">{{ label }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StatsCard',
  props: {
    label: String,
    items: [],
    icon: String
  }
});
</script>
