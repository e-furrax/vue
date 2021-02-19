<template>
  <header>
    <nav class="fixed w-full bg-purple-1200 h-14 border-b z-50">
      <div class="flex text-white text-sm mx-4 h-full items-center justify-between">
        <div class="flex h-full items-center">
          <a class="cursor-pointer text-lg">
            <router-link to="/">LOGO</router-link>
          </a>
          <ul class="h-full ml-14 flex items-center">
            <li
              class="h-full mr-10 flex items-center hover:text-purple-500 cursor-pointer border-b-2 border-transparent hover:border-purple-500 transition"
            >
              <router-link to="/search">Find your teammate</router-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <SearchBar />
          <router-link
            to="/sign-up"
            class="px-3 py-1 mx-2 bg-purple-700 rounded hover:bg-purple-600 transition duration-300"
          >
            Sign Up
          </router-link>
          <router-link
            to="/sign-in"
            class="px-3 py-1 mx-2 bg-gray-700 hover:bg-gray-600 transition duration-300 rounded"
            >Log In</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '../SearchBar.vue';

export default defineComponent({
  components: { SearchBar },
  name: 'Header'
});
</script>

<style scoped>
nav {
  border-color: #251e47;
  box-shadow: 2px 0 10px 1px #120b32;
}
</style>
