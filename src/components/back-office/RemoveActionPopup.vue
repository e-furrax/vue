<template>
  <Popup @onPopupClose="close">
    <template v-slot:content>
      <div>
        Careful, you're about to delete the following {{ name }}, are you sure you want to proceed?
      </div>
      <div class="overflow-y-auto bg-gray-200 shadow-2xl shadow-inner h-24 justify-center">
        <ul
          v-for="(value, key) of valuesToRender"
          :key="`popup-${key}`"
          class="mt-3 
          
          overflow-y-scroll "
        >
          <li>{{ key }}, {{ value }}</li>
        </ul>
      </div>
      <div class="flex justify-center m-3">
        <button>
          Cancel
        </button>
        <button>
          Proceed
        </button>
      </div>
    </template>
  </Popup>
</template>
<script>
import { defineComponent, toRefs, computed } from 'vue';
import Popup from '@/components/Popup.vue';

export default defineComponent({
  components: { Popup },
  props: {
    data: {
      type: Map,
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

    return {
      isOpen: true,
      valuesToRender
    };
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
});
</script>
