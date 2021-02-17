<template>
  <BackOfficeSidebar class="sidebar mt-10 bg-white w-1/5" />
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
<style class="postcss">
.sidebar {
  height: 90vh;
}
</style>
