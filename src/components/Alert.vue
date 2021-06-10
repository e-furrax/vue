<template>
  <div class="mt-1 text-sm rounded-md flex items-center" :class="alertType" role="alert">
    <svg
      class="w-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
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
  @apply text-blue-500;
}
.secondary {
  @apply text-gray-500;
}
.success {
  @apply text-green-500;
}
.warning {
  @apply text-yellow-500;
}
.danger {
  @apply text-red-500;
}
.info {
  @apply text-purple-500;
}
.dark {
  @apply text-gray-500;
}
</style>
