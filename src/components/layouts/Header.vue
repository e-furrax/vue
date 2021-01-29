<template>
  <header>
    <nav class="fixed w-full px-2 bg-purple-900 opacity-75">
      <div class="flex text-white text-lg font-bold py-4 justify-between">
        <div class="flex">
          <span class="px-2">Home</span>
          <ul>
            <li class="px-2">E-Palax</li>
          </ul>
        </div>
        <div class="flex">
          <button class="px-2">Login</button>
          <button class="px-2">Sign Up</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header'
});
</script>

<style>
</style>
