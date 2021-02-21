<template>
  <router-view name="header" class="navbar" />
  <div class="body">
    <router-view />
  </div>
  <router-view name="footer" class="footer" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAuth } from './modules/auth';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    onMounted(() => useAuth());
  }
});
</script>

<style lang="scss">
.body {
  padding-top: 3.5rem;
}
html,
body {
  height: 100%;
  width: 100%;
}
</style>
