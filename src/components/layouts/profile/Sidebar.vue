<template>
  <div class="flex flex-col lg:w-80 sm:w-24 bg-purple-1100">
    <ul class="flex flex-col py-4">
      <div v-for="route in myProfileRoutes.children" :key="route.path">
        <router-link
          :to="`/profile/${route.path}`"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          append
        >
          <li
            class="border-l-2 border-purple-400 bg-purple-950"
            :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
          >
            <a
              :href="href"
              @click="navigate"
              class="flex flex-row items-center h-16 text-white ml-6"
            >
              <span
                class="inline-flex items-center justify-center h-16 w-12 text-lg text-gray-400 lg:mr-2"
                ><i>ICON</i></span
              >
              <span class="text-sm font-medium">{{ route.name }}</span>
            </a>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { myProfileRoutes } from '@/router/myProfile';

export default defineComponent({
  name: 'Sidebar',
  data() {
    console.log(myProfileRoutes);
    return {
      myProfileRoutes
    };
  }
});
</script>

<style></style>
