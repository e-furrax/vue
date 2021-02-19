<template>
  <Pagination
    :size="mockTransaction.length"
    :element-by-page="elementByPage"
    @change-page="handleChangePage"
  >
    <div class="grid grid-cols-4 grid-flow-rows gap-4 m-10">
      <TransactionItem
        @click="$router.push()"
        v-for="transaction in transactionToRender"
        :key="`transaction-${transaction.id}`"
        :transaction="transaction"
      />
    </div>
  </Pagination>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Pagination from '@/components/Pagination.vue';
import TransactionItem from '@/components/back-office/TransactionItem.vue';
import TransationModel from '@/models/transaction.model';

const mockTransaction = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  .split(' ')
  .map((user, i) => ({
    id: i,
    meetId: i,
    createdAt: new Date(),
    updatedAt: new Date(),
    price: Math.floor(Math.random() * Math.floor(99)),
    status: 'WAITING_CONFIRMATION'
  }));
export default defineComponent({
  name: 'Transactions',
  components: { TransactionItem, Pagination },
  data() {
    return {
      mockTransaction,
      currentPage: 0,
      elementByPage: 12
    };
  },
  computed: {
    transactionToRender(): Array<TransationModel> {
      return this.mockTransaction.slice(
        this.currentPage * this.elementByPage,
        this.currentPage * this.elementByPage + this.elementByPage
      );
    }
  },
  methods: {
    handleChangePage(n: number) {
      this.currentPage = n;
    }
  }
});
</script>
