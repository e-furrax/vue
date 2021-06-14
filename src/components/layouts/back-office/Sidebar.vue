<template>
  <div class="flex flex-col text-center text-white">
    <section class="mt-10">
      <h3>Resources</h3>
      <ul class="flex flex-col py-4">
        <router-link
          v-for="route in routes.children"
          :key="route.name"
          :to="`/back-office/${route.path}`"
          v-slot="{ href, navigate, isActive }"
        >
          <li
            class="text-right ml-10 mt-3"
            :class="{ 'bg-purple-300 rounded-l-3xl text-black outward': isActive }"
          >
            <a :href="href" @click="navigate" class="flex flex-row items-center h-16 ml-6">
              <img
                :src="`/images/icons/${route.path}.svg`"
                class="inline-flex items-center justify-center rounded-full h-8 w-8 lg:mr-4"
                :class="{ 'bg-purple-1200': isActive }"
              />
              <span class="text-sm font-semibold hidden lg:block">{{ route.name }}</span>
            </a>
          </li>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { backOfficeOverviewRoutes as routes } from '@/router/backOffice';

export default defineComponent({
  name: 'BackOfficeSidebar',
  props: {},
  data() {
    return {
      routes,
      currentRoute: ''
    };
  },
  methods: {
    setCurrentRoute(r: string) {
      this.currentRoute = r;
    }
  }
});
</script>
