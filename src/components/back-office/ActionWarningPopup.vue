<template>
  <Popup @onPopupClose="close">
    <template v-slot:content>
      <Loader v-if="loading" />

      <div v-if="errorMessage">
        <img src="/images/icons/trash.svg" />
        error {{ errorMessage }}
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
            v-for="(value, key) of formattedPayload"
            :key="`popup-${key}`"
            class="mt-3 overflow-y-scroll"
          >
            <li>{{ key }}, {{ value }}</li>
          </ul>
        </div>
        <div class="flex justify-center m-3">
          <div class="w-full flex flex-col items-start">
            <button
              @click="useRemoveAppointment"
              class="w-full mt-2 border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200"
            >
              Proceed
            </button>
            <button class="mt-2">Cancel</button>
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed } from 'vue';
import { getAppointments, deleteAppointment } from '@/apollo/appointment.gql';
import { useMutation } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import Popup from '@/components/Popup.vue';

export default defineComponent({
  components: { Loader, Popup },
  props: {
    payload: {
      type: Map,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { payload } = toRefs(props);
    const isOpen = ref(true);
    const isDone = ref(false);
    const errorMessage = ref('');
    const formattedPayload = computed(() => Object.fromEntries(payload.value));

    const { mutate, loading, onDone, onError } = useMutation(deleteAppointment, {
      variables: {
        ids: Object.keys(formattedPayload.value)
      },
      clientId: 'mongo'
    });
    onDone(() => (isDone.value = true));
    onError(err => (errorMessage.value = err.name));
    const useRemoveAppointment = () => mutate();
    return {
      isOpen,
      loading,
      isDone,
      errorMessage,
      formattedPayload,
      useRemoveAppointment
    };
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
});
</script>
