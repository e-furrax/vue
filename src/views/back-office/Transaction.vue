<template>
  <div class="grid grid-cols-4 grid-flow-rows gap-4">
    <TransactionItem
      v-for="transaction in mockTransaction"
      :key="`transaction-${transaction.id}`"
      :transaction="transaction"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TransactionItem from '@/components/back-office/TransactionItem.vue';

const mockTransaction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  .split(' ')
  .map((user, i) => ({
    id: i,
    meetId: i,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    price: Math.floor(Math.random() * Math.floor(99)),
    status: 'PENDING'
  }));
export default defineComponent({
  name: 'Transactions',
  components: { TransactionItem },
  data() {
    return {
      mockTransaction
    };
  }
});
</script>
