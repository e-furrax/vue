<template>
  <section class="w-full h-full flex justify-center">
    <div class="w-10/12 flex flex-col my-12 space-y-8">
      <FirstStepFurrax v-if="step === 1" />
      <SecondStepFurrax v-if="step === 2" />
      <button
        class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
        @click="step = 1"
        v-if="step === 2"
      >
        Previous
      </button>
      <button
        class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
        @click="step = 2"
        v-if="step === 1"
      >
        Next
      </button>
      <button
        class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
        @click="step = 2"
        v-if="step === 2"
      >
        Submit
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { updateAvailabilityMutation } from '@/apollo/availability.gql';
import FirstStepFurrax from '@/components/become-furrax/FirstStepFurrax.vue';
import SecondStepFurrax from '@/components/become-furrax/SecondStepFurrax.vue';
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';

interface UpdateAvailabilityVariables {
  value: string;
}

interface AvailabilityMutation {
  updateAvailability: UpdateAvailabilityVariables;
}

export default defineComponent({
  components: { FirstStepFurrax, SecondStepFurrax },
  setup() {
    const step = ref(1);

    const { mutate: updateAvailability } = useMutation<
      AvailabilityMutation,
      UpdateAvailabilityVariables
    >(updateAvailabilityMutation);

    return {
      step
    };
  }
});
</script>

<style lang="postcss" scoped></style>
