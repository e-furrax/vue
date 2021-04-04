<template>
  <div
    class="game-preview relative mx-2 transition duration-300 transform hover:-translate-y-3 rounded-sm cursor-pointer"
    :data-background="background"
    @mouseover="handleMouseOver"
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
    name: String,
    background: String
  },
  methods: {
    handleMouseOver() {
      console.log(this.background);
      const bg = document.querySelector(`.bg-img img[data-src="${this.background}"]`);
      const allBg = document.querySelectorAll('.bg-img img');
      if (bg && allBg) {
        allBg.forEach(bg => bg.classList.add('hidden'));
        bg.classList.remove('hidden');
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.game-preview {
  width: 300px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.6);
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
