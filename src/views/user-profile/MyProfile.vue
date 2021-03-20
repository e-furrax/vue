<template>
  <div class="min-h-screen-minus-header flex flex-row max-w-full">
    <Sidebar />
    <section class="flex flex-col rounded-l-3xl w-full bg-purple-950">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from '@/components/layouts/profile/Sidebar';

export default defineComponent({
  name: 'MyProfile',
  components: { Sidebar }
});
</script>

<style>
.min-h-screen-minus-header {
  min-height: calc(100vh - 3.5rem);
}
</style>
