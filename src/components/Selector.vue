<template>
  <div class="flex flex-col">
    <div v-if="isOwner()" class="flex items-center">
      <select
        class="px-1 text-sm py-0.5 border border-purple-custom bg-purple-1100 rounded"
        name="my-data-add"
        ref="myDataAdd"
      >
        <option value="" select hidden>All {{ name }}</option>
        <option v-for="data of datas" :key="data.id" :value="data.id">
          {{ data.name }}
        </option>
      </select>
      <button
        class="
          ml-2
          px-4
          outline-none
          font-bold
          text-white
          uppercase
          rounded
          bg-purple-800
          text-sm
          py-0.5
          hover:bg-purple-700
          transition-all
          ease-in
          duration-200
        "
        @click="handleAdd"
      >
        Add
      </button>
    </div>
    <div class="mt-2 flex items-center flex-wrap">
      <div
        class="
          flex
          items-center
          mr-1
          text-sm
          px-3
          py-0.5
          bg-purple-1100
          rounded-full
          border border-purple-custom
        "
        v-for="data of userDatas"
        :key="data.id"
      >
        <span>{{ data.name }}</span>
        <img
          :data-game-id="data.id"
          @click="handleRemove"
          v-if="isOwner()"
          class="
            ml-1
            cursor-pointer
            hover:bg-red-400 hover:bg-opacity-30
            p-0.5
            transition
            duration-200
            rounded-full
          "
          src="/images/icons/close.svg"
          width="20"
        />
      </div>
      <div v-if="!userDatas.length">This user did not pick any {{ name.toLowerCase() }}.</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/composables/auth';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Selector',
  props: {
    name: {
      type: String,
      required: true
    },
    datas: {
      type: Array,
      required: true
    },
    userDatas: {
      type: Array,
      required: true
    }
  },
  setup() {
    const myDataAdd = ref();
    const { user } = useAuth();

    return {
      user,
      myDataAdd
    };
  },
  inject: ['isOwner', 'authorized'],
  methods: {
    handleAdd() {
      const id = this.myDataAdd.value;
      this.$emit('handle-add', id);
    },
    handleRemove(event: Event) {
      this.$emit('handle-remove', event);
    }
  }
});
</script>

<style lang="scss" scoped>
.border-purple-custom {
  border-color: #3b2963;
}
</style>
