<template>
  <div
    class="game-preview relative mx-2 transition duration-300 transform hover:scale-105 rounded-sm cursor-pointer"
  >
    <img :src="src" class="rounded-sm" :alt="src" />
    <div
      class="name text-2xl text-center absolute w-full h-full uppercase font-bold"
      style="top: 1rem"
    >
      {{ name }}
    </div>
    <div class="gradient-layer opacity-0 transition duration-300"></div>
    <div
      class="find-a-mate flex items-center transition duration-300 opacity-0 text-orange-600 absolute font-bold uppercase w-full text-center"
      style="bottom: 2rem"
    >
      <div class="w-full bg-orange-600" style="height: 2px"></div>
      <div class="flex-shrink-0 mx-4">Find a mate</div>
      <div class="w-full bg-orange-600" style="height: 2px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GamePreview',
  props: {
    src: String,
    name: String
  }
});
</script>

<style lang="scss" scoped>
.game-preview {
  width: 300px;
  & .name {
    text-shadow: rgb(0 0 0) 1px 1px, rgb(0 0 0) 1px 1px 0.1px;
  }

  &:hover {
    .find-a-mate {
      opacity: 1;
    }
    .gradient-layer {
      opacity: 1;
    }
  }
}

.gradient-layer {
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 0px, rgba(0, 0, 0, 0.95) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}
</style>