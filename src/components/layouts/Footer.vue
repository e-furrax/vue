<template>
  <footer class="flex flex-col justify-center items-center bg-gray-900 text-white font-xs">
    <span>E-Furrax, 2021</span>
    <span>Copyright, all rights reserved.</span>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer'
});
</script>

<style>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
}
</style>
