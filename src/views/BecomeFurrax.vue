<template>
  <section class="w-full h-full flex justify-center">
    <div class="w-10/12 flex flex-col my-12">
      <Form @submit="handleSubmit" :validation-schema="schema" class="space-y-8">
        <FirstStepFurrax v-if="step === 1" @selected-games="handleGameSelected" />
        <SecondStepFurrax v-if="step === 2" @availabilities-change="handleAvailabilityChange" />
        <div class="mt-4 space-x-4">
          <button
            type="button"
            class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
            @click="prevStep"
            v-if="step !== 1"
          >
            Previous
          </button>
          <button
            type="button"
            class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
            @click="nextStep"
            v-if="step === 1"
          >
            Next
          </button>
          <button
            type="submit"
            class="border-none outline-none bg-purple-700 rounded-3xl px-8 py-2 w-40 text-white font-semibold hover:bg-purple-800 transition ease-in duration-200"
            v-if="step === 2"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  </section>
</template>

<script lang="ts">
import FirstStepFurrax from '@/components/become-furrax/FirstStepFurrax.vue';
import SecondStepFurrax from '@/components/become-furrax/SecondStepFurrax.vue';
import { useMutation } from '@vue/apollo-composable';
import { defineComponent, ref } from 'vue';
import { Form } from 'vee-validate';
import { object, string } from 'yup';
import { becomeFurrax } from '@/apollo/user.gql';
import { useAuth } from '@/composables/auth';
import { ROLES } from '@/models/user.model';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

interface BecomeFurraxVariables {
  data: {
    games: { ids: [number] };
    description: string;
    availability: string;
    languages: { ids: [number] };
  };
}

interface BecomeFurraxMutationResponse {
  becomeFurrax: boolean;
}

export default defineComponent({
  components: { FirstStepFurrax, SecondStepFurrax, Form },
  setup() {
    const step = ref(1);
    const nextStep = () => {
      step.value += 1;
    };
    const prevStep = () => {
      step.value -= 1;
    };
    const selectedGames = ref<any>([]);
    const availability = ref<any>([]);

    const { mutate } = useMutation<BecomeFurraxMutationResponse, BecomeFurraxVariables>(
      becomeFurrax
    );
    const router = useRouter();
    const { user } = useAuth();
    const toast = useToast();

    const schema = object({
      description: string()
    });

    const mapIds = (array: any) => {
      return array.value
        ? array.value.map((elm: any) => +elm.id)
        : array.map((elm: any) => +elm.id);
    };
    const handleSubmit = (values: any) => {
      mutate({
        data: {
          games: { ids: mapIds(selectedGames) },
          description: values.description,
          availability: JSON.stringify(availability.value),
          languages: { ids: mapIds(values.languages) }
        }
      }).then(() => {
        if (user?.value) {
          user.value = { ...user?.value, role: ROLES.FURRAX };
          toast.success('You are now a Furrax !');
          router.push(`/user/${user.value.id}`);
        }
      });
    };

    const handleGameSelected = (event: any) => {
      selectedGames.value = event;
    };

    const handleAvailabilityChange = (event: any) => {
      availability.value = event;
    };

    return {
      step,
      nextStep,
      prevStep,
      handleSubmit,
      schema,
      handleGameSelected,
      handleAvailabilityChange
    };
  }
});
</script>

<style lang="postcss" scoped></style>
