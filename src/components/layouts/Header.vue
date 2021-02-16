<template>
  <header>
    <nav class="fixed w-full bg-purple-1050 h-14">
      <div class="flex text-white mx-4 h-full items-center justify-between">
        <div class="flex text-lg">
          <a class="cursor-pointer"><span>LOGO</span></a>
          <ul class="ml-14">
            <li
              class="mx-2 hover:text-orange-300 border-b border-transparent hover:border-orange-300 transition"
            >
              E-Furrax
            </li>
          </ul>
          <ul class="ml-14">
            <li
              class="mx-2 hover:text-orange-300 border-b border-transparent hover:border-orange-300 transition"
            >
              <router-link to="/search?param=any" class="py-1 rounded"
                >Find your teammate</router-link
              >
            </li>
          </ul>
        </div>
        <div class="flex text-sm items-center">
          <SearchBar
            id="search-bar"
            class="p-2 mr-4 rounded-full search-bar transition-colors duration-500 ease-in-out hover:border-orange-300 focus:border-orange-300"
            :class="{ 'border-orange-300': isActive }"
            @click="isActive = !isActive ? !isActive : isActive"
            placeholder="Search..."
            v-click-outside="onClickOutside"
          />
          <button class="px-3 py-1 mx-2 border rounded">SIGN UP</button>
          <router-link to="/sign-in" class="px-3 py-1 mx-2 bg-amber-600 rounded"
            >LOG IN
          </router-link>
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
}
</style>
