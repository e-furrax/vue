<template>
  <BackOfficeSidebar class="w-1/3" v-if="sidebarIsOpen" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BackOfficeSidebar from '@/components/back-office/Sidebar.vue';

export default defineComponent({
  name: 'BackOffice',
  components: { BackOfficeSidebar },
  data() {
    return {
      sidebarIsOpen: false
    };
  },
  methods: {
    toggleSidebar(value) {
      this.sidebarIsOpen = value;
    }
  }
});
</script>
