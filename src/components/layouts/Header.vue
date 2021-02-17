<template>
  <header>
    <nav class="fixed w-full bg-purple-1200 h-14 border-b z-50">
      <div class="flex text-white text-sm mx-4 h-full items-center justify-between">
        <div class="flex h-full items-center">
          <a class="cursor-pointer text-lg"><span>LOGO</span></a>
          <ul class="h-full ml-14 flex items-center">
            <li
              class="h-full mr-10 flex items-center hover:text-purple-500 cursor-pointer border-b-2 border-transparent hover:border-purple-500 transition"
            >
              <span>E-Furrax</span>
            </li>
            <li
              class="h-full flex items-center hover:text-purple-500 cursor-pointer border-b-2 border-transparent hover:border-purple-500 transition"
            >
              <span>About</span>
            </li>
          </ul>
          <ul class="ml-14">
            <li
              class="mx-2 hover:text-orange-300 border-b border-transparent hover:border-orange-300 transition"
            >
              <router-link to="/search" class="py-1 rounded"
                >Find your teammate</router-link
              >
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <SearchBar
            id="search-bar"
            class="p-1 text-xs mr-4 rounded-full bg-gray-900 search-bar transition duration-300 hover:border-purple-800 focus:border-purple-800"
            :class="{ 'border-purple-800': isActive, 'w-96': isActive }"
            @click="isActive = !isActive ? !isActive : isActive"
            placeholder="Search..."
            v-click-outside="onClickOutside"
          />
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
import clickOutside from '@/library/click-outside';

export default defineComponent({
  components: { SearchBar },
  name: 'Header',
  data() {
    return {
      isActive: false
    };
  },
  directives: {
    clickOutside
  },
  methods: {
    onClickOutside() {
      this.isActive = false;
    }
  }
});
</script>

<style scoped>
.search-bar {
  border: 1px solid rgb(55, 43, 96);
  background-color: rgb(35, 28, 67);
}

nav {
  border-color: #251e47;
  box-shadow: 2px 0 10px 1px #120b32;
}
</style>
