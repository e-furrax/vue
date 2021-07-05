<template>
  <div class="flex flex-col">
    <slot />
    <div class="flex flex-row justify-center my-10">
      <div
        v-for="(page, i) in pages"
        :key="`page-${page}`"
        @click="changePage(i)"
        :class="
          `bg-${
            i === currentPage ? 'red' : 'purple'
          }-500 mr-10 cursor-pointer text-white rounded px-4 py-3`
        "
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    size: {
      type: Number,
      required: true
    },
    elementByPage: {
      type: Number,
      required: true
    }
  },
  data: () => ({ currentPage: 0 }),
  computed: {
    pages(): Array<string> {
      console.log(this.size);
      const nPage = ~~(this.size / this.elementByPage);
      return nPage > 7
        ? [...[...Array(5)].map((_, i) => `${i + 1}`), '...', `${nPage}`]
        : [...Array(nPage)].map((_, i) => `${i + 1}`);
    }
  },
  methods: {
    changePage(page: number) {
      this.currentPage = page;
      this.$emit('change-page', this.currentPage);
    }
  }
});
</script>
