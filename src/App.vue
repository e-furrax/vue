<template>
  <router-view name="header" id="navbar" />
  <router-view id="body" />
  <router-view name="footer" id="footer" />
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
#body {
  padding-top: 60px;
}
html,
body {
  height: 100%;
  width: 100%;
}
</style>
