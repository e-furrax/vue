<template>
  <div class="flex flex-col items-center text-white">
    <img src="/images/icons/cloud_off.svg" width="50" class="mb-6" />
    <span class="text-xl mb-2">Looks like something bad happened!</span>
    <span class="mb-6">{{ message }}</span>
    <button
      class="
        font-bold
        uppercase
        rounded
        bg-orange-600
        text-sm
        py-2
        px-6
        hover:bg-orange-700
        transition-all
        ease-in
        duration-200
      "
      @click="handleRetry"
    >
      Retry
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error',
  props: {
    message: {
      type: String
    }
  },
  methods: {
    handleRetry() {
      this.$router.go(0);
    }
  }
});
</script>

<style lang="postcss" scoped></style>
