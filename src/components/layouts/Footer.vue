<template>
  <footer
    class="flex flex-col text-xs mt-20 text-purple-200 justify-center items-center bg-purple-950 text-white h-24"
  >
    <div class="mb-2 text-sm">
      <router-link class="mx-4 hover:text-white transition duration-300" to="/"
        >Terms of Service</router-link
      >
      <router-link class="mx-4 hover:text-white transition duration-300" to="/"
        >Privacy Policy</router-link
      >
      <router-link class="mx-4 hover:text-white transition duration-300" to="/"
        >Cookie Policy</router-link
      >
    </div>
    <div>
      <span class="mx-4">E-Furrax</span>
      <span class="mx-4">Copyright © 2021 All rights reserved.</span>
    </div>
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
  width: 100%;
}
</style>
