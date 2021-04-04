<template>
  <div class="body">
    <router-view name="header" class="navbar" />
    <router-view />
    <router-view name="footer" class="footer" />
  </div>
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

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
}

.footer {
  margin-top: auto;
}

.body {
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
