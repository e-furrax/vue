<template>
  <div class="flex flex-col text-center text-white">
    <section class="mt-10">
      <h3>Dashboard</h3>
    </section>

    <section class="mt-10">
      <h3>Resources</h3>
      <div v-for="resource in resources" :key="resource.route" class="text-right mr-10 mt-3">
        <router-link :to="`/back-office/${resource.route}`">{{ resource.name }} </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const resources = [
  { route: 'profiles', name: 'Profiles' },
  { route: 'furries-meet', name: 'Meet' },
  { route: 'transactions', name: 'Transactions' }
];
export default defineComponent({
  name: 'BackOfficeSidebar',
  props: {},
  data() {
    return {
      resources
    };
  }
});
</script>
