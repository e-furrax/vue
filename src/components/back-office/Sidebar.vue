<template>
  <div class="w-1/3">
    <div v-for="table in crud" :key="table">
      <p>{{ table }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const crud = ['Users', 'Transactions', 'Furries-Meet'];
export default defineComponent({
  name: 'BackOfficeSidebar',
  data() {
    return {
      crud
    };
  }
});
</script>
