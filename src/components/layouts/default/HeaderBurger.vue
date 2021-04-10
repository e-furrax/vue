<template>
  <div class="h-full w-full fixed top-0 left-0 z-50">
    <div
      class="burger-layer w-full h-full bg-black bg-opacity-50 transition duration-300"
      @click="handleBurger"
    ></div>
    <div
      class="burger-nav absolute top-0 left-0 bg-purple-1200 h-full translate-x-240"
      style="width: 240px"
    >
      <ul class="h-14 border-b border-purple-1000 flex items-center">
        <img
          src="/images/icons/menu.svg"
          class="block pl-6 mr-6 cursor-pointer opacity-50"
          @click="handleBurger"
        />
        <router-link to="/" class="text-lg flex items-center">
          <img src="/images/e-furrax.svg" width="24" /><span class="ml-3 text-base">E-FURRAX</span>
        </router-link>
      </ul>
      <ul class="py-3 border-b border-purple-1000">
        <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000">
          <router-link to="/" class="flex items-center">
            <img src="/images/icons/home.svg" class="opacity-50 mr-6" />
            <span>Home</span>
          </router-link>
        </li>
        <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000">
          <router-link to="/search" class="flex items-center">
            <img src="/images/icons/person_search.svg" class="opacity-50 mr-6" />
            <span>Find your teammate</span>
          </router-link>
        </li>
        <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000">
          <router-link to="/profile" class="flex items-center">
            <img src="/images/icons/person.svg" class="opacity-50 mr-6" />
            <span>Profile</span>
          </router-link>
        </li>
      </ul>
      <ul class="py-3 px-4 flex flex-col items-start">
        <li
          class="px-3 py-1 cursor-pointer bg-gray-700 hover:bg-gray-600 transition duration-300 rounded"
        >
          <router-link to="/sign-in"> Log In </router-link>
        </li>
        <li
          class="px-3 py-1 mt-3 cursor-pointer bg-purple-700 hover:bg-purple-600 transition duration-300 rounded"
        >
          <router-link to="/sign-up"> Sign Up </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HeaderBurger',
  inject: ['handleBurger']
});
</script>

<style lang="scss" scoped>
.translate-x-240 {
  transform: translateX(-240px);
}

.burger-nav {
  transition: transform 0.3s ease;
}
</style>
