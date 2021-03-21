<template>
  <div class="flex flex-col lg:w-80 sm:w-24 bg-purple-1100">
    <div class="flex flex-row items-center my-8 ml-6">
      <div class="inline-flex rounded-full h-14 w-14 bg-red-500"></div>
      <span class="text-white mx-4 hidden lg:block">Jean Paul</span>
    </div>
    <span class="text-blueGray-custom ml-6 text-sm font-semibold">Menu</span>
    <ul class="flex flex-col py-4">
      <div v-for="route in myProfileRoutes.children" :key="route.path">
        <router-link
          :to="`/profile/${route.path}`"
          v-slot="{ href, route, navigate, isActive }"
          custom
        >
          <li
            :class="[isActive && 'router-link-active']"
            class="hover:bg-purple-950 transition-colors duration-100"
          >
            <a
              :href="href"
              @click="navigate"
              class="flex flex-row items-center h-16 text-blueGray-custom ml-6"
            >
              <span
                class="inline-flex items-center justify-center bg-purple-500 rounded-xl h-10 w-10 text-xs text-white lg:mr-4"
                ><i>ICON</i></span
              >
              <span class="text-sm font-semibold hidden lg:block">{{ route.name }}</span>
            </a>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { myProfileRoutes } from '@/router/myProfile';

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      myProfileRoutes
    };
  }
});
</script>

<style lang="postcss">
.router-link-active {
  @apply border-l-2 border-purple-400 bg-purple-950;
}
</style>
