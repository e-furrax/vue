<template>
  <div
    class="py-3 px-5 mb-4 text-sm rounded-md border flex items-center"
    :class="alertType"
    role="alert"
  >
    <div class="w-4 mr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        v-html="iconHtml"
      ></svg>
    </div>
    <span>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { svgPath, AlertType } from '@/utils/alertComponentIcons';

export default defineComponent({
  name: 'Alert',
  props: {
    message: {
      type: String
    },
    alertType: {
      type: String as PropType<AlertType>,
      required: true
    }
  },
  computed: {
    iconHtml(): string | null {
      return svgPath(this.alertType);
    }
  }
});
</script>

<style lang="postcss" scoped>
.primary {
  @apply bg-blue-200 text-blue-900 border-blue-300;
}
.secondary {
  @apply bg-gray-200 text-gray-900 border-gray-300;
}
.success {
  @apply bg-green-200 text-green-900 border-green-300;
}
.warning {
  @apply bg-yellow-200 text-yellow-900 border-yellow-300;
}
.danger {
  @apply bg-red-200 text-red-900 border-red-300;
}
.info {
  @apply bg-purple-200 text-purple-900  border-purple-300;
}
.dark {
  @apply bg-gray-300 text-gray-900 border-gray-400;
}
</style>
