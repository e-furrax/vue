<template>
  <div class="flex flex-col cursor-pointer border-4 border-white hover:border-purple-500 rounded">
    <p>Meeting id: {{ transaction.meetId }}</p>
    <p>Price: {{ transaction.price }}</p>
    <p>Status: {{ transaction.status }}</p>
    <div class="h-1/3 bg-white rounded text-gray-500">
      <p>Created at: {{ transaction.createdAt }}</p>
      <p>Last updated at: {{ transaction.updatedAt }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionItem',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
});
</script>
