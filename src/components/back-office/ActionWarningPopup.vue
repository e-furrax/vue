<template>
  <Popup @onPopupClose="close">
    <template v-slot:content>
      <Loader v-if="isLoading" />

      <div v-if="errors">
        <img src="/images/icons/trash.svg" />
        error {{ errors }}
      </div>

      <div v-else-if="!isLoading && isDone">
        <img src="/images/icons/star.svg" />
        Done
      </div>

      <div v-else-if="!isLoading && !isDone">
        <div>
          Careful, you're about to delete the following {{ name }}, are you sure you want to
          proceed?
        </div>
        <div class="overflow-y-auto bg-gray-200 shadow-2xl shadow-inner h-24 justify-center">
          <ul
            v-for="(value, key) of valuesToRender"
            :key="`popup-${key}`"
            class="mt-3 overflow-y-scroll "
          >
            <li>{{ key }}, {{ value }}</li>
          </ul>
        </div>
        <div class="flex justify-center m-3">
          <button>
            Cancel
          </button>
          <button @click="useHandler">
            Proceed
          </button>
        </div>
      </div>
    </template>
  </Popup>
</template>
<script>
import { defineComponent, toRefs, ref, computed } from 'vue';
import Loader from '@/components/Loader.vue';
import Popup from '@/components/Popup.vue';

export default defineComponent({
  components: { Loader, Popup },
  props: {
    data: {
      type: Map,
      required: true
    },
    handler: {
      type: Function,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { data } = toRefs(props);
    const valuesToRender = computed(() => Object.fromEntries(data.value));
    const isDone = ref(false);
    let isLoading = ref(false);
    let errors = ref(false);
    const useHandler = () => {
      const { loading, onDone, error } = this.handler(Object.keys(valuesToRender));
      isLoading = loading;
      errors = error;
      onDone(() => (isDone.value = true));
    };

    return {
      isOpen: true,
      valuesToRender,
      useHandler,
      isDone,
      isLoading,
      errors
    };
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
});
</script>
