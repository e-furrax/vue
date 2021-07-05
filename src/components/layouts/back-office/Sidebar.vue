<template>
  <div class="flex flex-col text-center text-white">
    <section class="mt-20">
      <ul class="flex flex-col w-16 lg:w-48">
        <router-link
          v-for="route in routes.children"
          :key="route.name"
          :to="`/back-office/${route.path}`"
          v-slot="{ href, navigate, isActive }"
        >
          <li
            class="text-right my-1"
            :class="{
              'bg-darkpurple-200 shadow rounded-l-xl border border-purple-custom border-r-0': isActive
            }"
          >
            <a :href="href" @click="navigate" class="flex flex-row items-center px-4 py-3">
              <img
                :src="`/images/icons/${route.path}.svg`"
                class="inline-flex items-center justify-center rounded-full p-1 h-8 w-8 lg:mr-4"
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

<style lang="scss" scoped>
.border-purple-custom {
  border-color: #382f66;
}
</style>
