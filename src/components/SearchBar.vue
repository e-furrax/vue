<template>
  <div class="flex">
    <svg fill="currentColor" viewBox="0 0 512.005 512.005" class="search-icon mr-3">
      <path
        d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"
      ></path>
    </svg>
    <input
      class="outline-none text-white border-none bg-transparent w-full"
      type="text"
      autocomplete="off"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    placeholder: { type: String }
  }
});
</script>

<style lang="scss">
.search-icon {
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  fill: rgb(137, 145, 182);
}
</style>
