<template>
  <div>
    <p class="text-3xl">{{ profile.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackOfficeProfile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
});
</script>
