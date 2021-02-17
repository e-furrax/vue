<template>
  <router-view name="header" />
  <router-view />
  <router-view name="footer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {}
});
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
}
</style>
