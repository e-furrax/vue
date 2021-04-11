<template>
  <div
    class="game-preview relative transition duration-300 rounded-sm cursor-pointer
      xl:w-72 xl:h-96
      lg:w-60 lg:h-72
      md:w-92 md:h-32
      w-full h-32
    "
    :data-background="background"
    :style="`background: center / cover no-repeat url('${src}');`"
    @mouseover="handleMouseOver"
  >
    <div class="mask-layer opacity-1 transition duration-300"></div>
    <div class="gradient-layer opacity-0 transition duration-300"></div>
    <div
      class="name text-center absolute w-full h-full uppercase font-bold
        xl:text-2xl
        lg:text-xl
        text-2xl
        top-10
        lg:top-4
      "
    >
      {{ name }}
    </div>
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
  box-shadow: 0px 4px 14px rgba(9, 7, 22, 0.6);

  &:hover {
    .find-a-mate {
      opacity: 1;
    }
    .gradient-layer {
      opacity: 1;
    }

    .mask-layer {
      opacity: 0.7;
    }
  }
}

.mask-layer {
  background-image: linear-gradient(180deg, rgba(23, 16, 56, 0.2) 50%, rgba(23, 16, 56, 0.7) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}

.gradient-layer {
  background-image: linear-gradient(rgba(23, 16, 56, 0.2) 0px, rgba(0, 0, 0, 0.5) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}
</style>
