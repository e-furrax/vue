<template>
  <div class="text-center text-white flex flex-col items-center">
    <div ref="floatingImg" class="floating"><slot name="icon" /></div>
    <h3 class="text-2xl my-4"><slot name="title" /></h3>
    <p><slot name="description" /></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FeatureCard',
  props: {},
  mounted() {
    const rand = 7 + Math.random() * 8;
    const floatingImg = this.$refs.floatingImg as HTMLDivElement | null;
    if (floatingImg) {
      floatingImg.style.animationDuration = `${rand}s`;
    }
  }
});
</script>

<style lang="scss" scoped>
.floating {
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6));
  animation-name: floating;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, -15px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>
