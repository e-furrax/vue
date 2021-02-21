<template>
  <div class="flex flex-row">
    <BackOfficeSidebar class="sidebar bg-gray-500 w-1/5" />
    <div class="flex flex-col w-4/5">
      <h1 class="name text-2xl text-center uppercase text-white font-bold">{{ $route.name }}</h1>
      <router-view class="bg-gray-200 m-10 text-center" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackOfficeSidebar from '@/components/back-office/Sidebar.vue';

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
<style class="postcss"></style>
