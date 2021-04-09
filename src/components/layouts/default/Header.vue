<template>
  <header>
    <nav class="w-full bg-purple-1200 h-14 border-b z-50">
      <div class="flex text-white text-sm mx-6 h-full items-center justify-between">
        <HeaderBurger ref="burgerMenu" class="burger-menu hidden" />
        <div class="flex h-full items-center">
          <img src="/images/icons/menu.svg" class="block md:hidden mr-6 cursor-pointer z-50" @click="handleBurger" />
          <router-link to="/" class="text-lg flex items-center">
            <img src="/images/e-furrax.svg" width="24" /><span class="ml-3 text-base">E-FURRAX</span>
          </router-link>
          <ul class="hidden md:flex h-full ml-8 items-center">
            <li
              class="h-full mr-8 flex items-center hover:text-purple-500 cursor-pointer border-b-2 border-transparent hover:border-purple-500 transition"
            >
              <router-link to="/search">Find your teammate</router-link>
            </li>
            <li
              class="h-full flex items-center hover:text-purple-500 cursor-pointer border-b-2 border-transparent hover:border-purple-500 transition"
            >
              <router-link to="/profile">Profile</router-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <SearchBar class="mr-4" />
          <router-link
            to="/sign-up"
            class="hidden md:block px-3 py-1 mx-2 bg-purple-700 rounded hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </router-link>
          <router-link
            to="/sign-in"
            class="hidden md:block px-3 py-1 mx-2 bg-gray-700 hover:bg-gray-600 transition duration-300 rounded"
            >Log In</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '../../SearchBar.vue';
import HeaderBurger from './HeaderBurger.vue';

export default defineComponent({
  components: { SearchBar, HeaderBurger },
  name: 'Header',
  provide() {
    return {
      handleBurger: this.handleBurger,
    }
  },
  methods: {
    handleBurger(event: { target: HTMLDivElement }) {
      const burgerMenu = document.querySelector('.burger-menu') as HTMLDivElement;
      const burgerNav = burgerMenu.querySelector('.burger-nav') as HTMLDivElement;
      burgerMenu.classList.toggle('hidden');
      burgerNav.classList.toggle('translate-x-240');
    }
  }
});
</script>

<style land="scss" scoped>
nav {
  border-color: #251e47;
  box-shadow: 2px 0 10px 1px #120b32;
}
</style>
