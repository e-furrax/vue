<template>
  <div class="">
    <div v-for="table in crud" :key="table.route" class=" flex flex-col text-2xl font-bold">
      <router-link :to="`/back-office/${table.route}`">{{ table.name }} </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const crud = [
  { route: 'profiles', name: 'Profiles' },
  { route: 'furries-meet', name: 'Furries-Meet' }
];
export default defineComponent({
  name: 'BackOfficeSidebar',
  props: {},
  data() {
    return {
      crud
    };
  }
});
</script>
