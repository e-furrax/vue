<template>
  <div class="flex flex-col">
    <slot />
    <div class="flex flex-row justify-center my-10">
      <div
        v-for="(page, i) in pages"
        :key="`page-${page}`"
        @click="changePage(i)"
        class="mr-10 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center"
        :class="[+page === currentPage + 1 ? 'bg-pink-500' : 'bg-purple-1100']"
      >
        <span>{{ page }}</span>
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
      const nPage = ~~(this.size / this.elementByPage);
      return nPage > 10
        ? [...[...Array(10)]].map((_, i) => `${i + 1}`)
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
