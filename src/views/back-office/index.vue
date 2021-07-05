<template>
  <div class="flex flex-row container mx-auto mt-10">
    <BackOfficeSidebar class="sidebar bg-purple-1100" />
    <div class="flex flex-col w-full pb-32 min-h-full">
      <h1 class="name text-2xl text-center uppercase text-white font-bold mb-5">
        {{ $route.name }}
      </h1>
      <router-view
        class="border border-purple-custom bg-darkpurple-200 shadow text-center h-full rounded-xl p-6"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackOfficeSidebar from '@/components/layouts/back-office/Sidebar.vue';

export default defineComponent({
  name: 'BackOffice',
  components: { BackOfficeSidebar },
  data() {
    return {
      sidebarIsOpen: true
    };
  },
  methods: {
    toggleSidebar(value: boolean) {
      this.sidebarIsOpen = value;
    }
  }
});
</script>

<style lang="scss" scoped>
.border-purple-custom {
  border-color: #382f66;
}
</style>
