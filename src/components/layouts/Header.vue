<template>
  <header class="z-50 w-full">
    <nav class="fixed w-full bg-purple-1050 h-14">
      <div class="flex text-white mx-4 h-full items-center justify-between">
        <div class="flex text-lg h-full items-center">
          <a class="cursor-pointer"><span>LOGO</span></a>
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
        </div>
        <div class="flex text-sm items-center">
          <SearchBar
            id="search-bar"
            class="p-2 mr-4 rounded-full search-bar transition duration-300 hover:border-purple-800 focus:border-purple-800"
            :class="{ 'border-purple-800': isActive, 'w-96': isActive }"
            @click="isActive = !isActive ? !isActive : isActive"
            placeholder="Search..."
            v-click-outside="onClickOutside"
          />
          <router-link
            to="/sign-up"
            class="px-3 py-1 mx-2 bg-purple-700 rounded hover:bg-purple-600 transition duration-300"
          >
            SIGN UP
          </router-link>
          <router-link
            to="/sign-in"
            class="px-3 py-1 mx-2 bg-gray-700 hover:bg-gray-600 transition duration-300 rounded"
            >LOG IN</router-link
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

<style>
.search-bar {
  border: 1px solid rgb(55, 43, 96);
  background-color: rgb(35, 28, 67);
  transition: width 0.3s;
}
</style>
