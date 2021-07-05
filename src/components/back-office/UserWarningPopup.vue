<template>
  <Popup @onPopupClose="close">
    <template v-slot:content>
      <Loader v-if="loading" />

      <div v-if="errorMessage">
        <img src="/images/icons/trash.svg" />
        error {{ errorMessage }}
      </div>

      <div class="flex items-center mb-2 p-1" v-else-if="!loading && isDone">
        <img src="/images/icons/done.svg" />
        <span class="ml-2">Done</span>
      </div>

      <div v-else-if="!loading && !isDone">
        <p class="mb-2">
          Careful, you're about to change the role the following {{ name }}, are you sure you want
          to proceed?
        </p>
        <div
          class="overflow-y-auto bg-darkpurple-200 p-1 shadow-2xl shadow-inner h-24 justify-center"
        >
          {{ payload.user.username }} from {{ payload.user.role }} to {{ payload.newRole }}
        </div>
        <div class="flex justify-center mb-2">
          <div class="w-full flex flex-col items-start">
            <button
              @click="useRemove"
              class="w-full mt-2 border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </template>
  </Popup>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue';
import { updateRole } from '@/apollo/promotion.gql';
import { useMutation } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import Popup from '@/components/Popup.vue';

export default defineComponent({
  components: { Loader, Popup },
  props: {
    payload: {
      type: Object,
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

    const { mutate, loading, onDone, onError } = useMutation(updateRole, {
      variables: {
        promotion: { id: +payload.value.user.id, role: payload.value.newRole }
      }
    });

    onDone(() => {
      return (isDone.value = true);
    });
    onError(err => (errorMessage.value = err.message));
    const useRemove = () => mutate();
    return {
      isOpen,
      loading,
      isDone,
      errorMessage,
      useRemove
    };
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
});
</script>
