<template>
  <header>
    <nav class="w-full bg-purple-1200 h-14 border-b z-50">
      <div class="flex text-white text-sm mx-6 h-full items-center justify-between">
        <HeaderBurger />
        <div class="flex h-full items-center">
          <img
            src="/images/icons/menu.svg"
            class="block lg:hidden mr-6 cursor-pointer"
            @click="handleBurger"
          />
          <router-link to="/" class="text-lg flex items-center">
            <img src="/images/e-furrax.svg" width="24" /><span
              class="hidden sm:block ml-3 text-base"
              >E-FURRAX</span
            >
          </router-link>
          <ul class="hidden lg:flex h-full ml-8 items-center">
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
          <SearchBar class="lg:mr-4" />
          <router-link
            to="/sign-up"
            class="hidden lg:block px-3 py-1 mx-2 bg-orange-600 rounded hover:bg-orange-700 transition duration-300"
          >
            Sign Up
          </router-link>
          <router-link
            to="/sign-in"
            class="hidden lg:block px-3 py-1 mx-2 rounded bg-transparent border border-purple-400 text-purple-400 hover:border-purple-300 hover:text-purple-300 transition duration-300"
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
  data() {
    return {
      burgerClosing: false
    };
  },
  mounted() {
    const burgerMenu = document.querySelector('.burger-menu') as HTMLDivElement;
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        if (burgerMenu.dataset.opened === 'true' && !this.burgerClosing) {
          this.burgerClosing = true;
          this.handleBurger();
        }
      }
    });

    burgerMenu.addEventListener('transitionend', event => {
      if (event.propertyName === 'transform') {
        if (burgerMenu.dataset.opened === 'true') {
          burgerMenu.classList.add('invisible');
          burgerMenu.dataset.opened = 'false';
          this.burgerClosing = false;
          return;
        }
        burgerMenu.dataset.opened = 'true';
      }
    });
  },
  provide() {
    return {
      handleBurger: this.handleBurger
    };
  },
  methods: {
    handleBurger() {
      const burgerMenu = document.querySelector('.burger-menu') as HTMLDivElement;
      const burgerLayer = document.querySelector('.burger-layer') as HTMLDivElement;
      const burgerNav = burgerMenu.querySelector('.burger-nav') as HTMLDivElement;
      const body = document.querySelector('body') as HTMLBodyElement;
      if (burgerMenu.dataset.opened === 'false') {
        burgerMenu.classList.remove('invisible');
      }
      burgerLayer.classList.toggle('opacity-50');
      burgerNav.classList.toggle('translate-x-240');
      body.classList.toggle('overflow-hidden');
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
