<template>
  <div
    class="game-rank flex items-center py-3 px-6 border border-purple-custom hover:border-purple-900 transition duration-200 rounded-sm"
    :style="
      `
        background-image: linear-gradient(to left, rgba(27, 21, 61, 0.5) 100px, rgba(27, 21, 61, 1) 140px),
    url('${background}');
    `
    "
  >
    <slot name="image" />
    <div class="flex flex-col ml-3">
      <span class="font-bold"><slot name="game"/></span>
      <span class="text-sm text-gray-200"><slot name="mode"/></span>
      <span class="text-xs text-gray-200"><slot name="rank"/></span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GameRank',
  props: {
    background: String
  }
});
</script>

<style lang="postcss" scoped>
.game-rank {
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
  @apply bg-purple-1100;
}
</style>
