<template>
  <div class="availability relative">
    <img
      src="/images/icons/edit.svg"
      class="absolute right-0 cursor-pointer hover:bg-white hover:bg-opacity-20 transition duration-200 p-1 rounded-full"
      style="top: -2rem"
      width="24"
      @click="handleEditing"
      v-if="!editing"
    />
    <div v-show="!editing">
      <div
        v-for="day in availability"
        :key="day"
        class="p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
      >
        <div class="flex items-center justify-between text-white">
          <span>{{ day.name }}</span>
          <span v-if="day.enabled">{{ day.start }} - {{ day.end }}</span>
          <span v-else>Not available</span>
        </div>
      </div>
    </div>
    <Form v-show="editing" :validation-schema="schema" @submit="handleAvailability">
      <div
        v-for="(day, index) in availability"
        :key="index"
        class="flex p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
      >
        <Field
          class="bg-purple-925 px-1 rounded-sm text-white"
          :name="`start${index + 1}`"
          type="time"
          :value="day.start"
        />
        <span class="mx-2">-</span>
        <Field
          class="bg-purple-925 px-1 rounded-sm text-white"
          :name="`end${index + 1}`"
          type="time"
          :value="day.end"
        />
        <div>
          <InputToggle :enabled="day.enabled" :name="`enabled${index + 1}`" class="ml-2" />
        </div>
      </div>
      <div class="mt-2 flex items-center justify-end">
        <button
          @click.prevent="handleEditing"
          class="
            px-4
            mr-2
            outline-none
            font-bold
            text-white
            uppercase
            rounded
            border border-purple-800
            text-sm
            leading-8
            py-1
            hover:border-purple-700
            transition-all
            ease-in
            duration-200
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          class="
            px-4
            outline-none
            font-bold
            text-white
            uppercase
            rounded
            bg-purple-800
            text-sm
            leading-8
            py-1
            hover:bg-purple-700
            transition-all
            ease-in
            duration-200
          "
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';

import InputToggle from '@/components/InputToggle.vue';
import { useMutation } from '@vue/apollo-composable';
import { updateAvailabilityMutation } from '@/apollo/availability.gql';

interface AvailibilityForm {
  [key: string]: string | boolean | undefined;

  start1: string;
  end1: string;
  enabled1: boolean | undefined;

  start2: string;
  end2: string;
  enabled2: boolean | undefined;

  start3: string;
  end3: string;
  enabled3: boolean | undefined;

  start4: string;
  end4: string;
  enabled4: boolean | undefined;

  start5: string;
  end5: string;
  enabled5: boolean | undefined;

  start6: string;
  end6: string;
  enabled6: boolean | undefined;

  start7: string;
  end7: string;
  enabled7: boolean | undefined;
}

interface UpdateAvailabilityVariables {
  value: string;
}

interface AvailabilityMutation {
  updateAvailability: UpdateAvailabilityVariables;
}

export default defineComponent({
  name: 'Availability',
  components: { Field, Form, InputToggle },
  setup(_, { emit }) {
    const { mutate: updateAvailability } = useMutation<
      AvailabilityMutation,
      UpdateAvailabilityVariables
    >(updateAvailabilityMutation);

    const availability = ref([
      { name: 'Monday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Tuesday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Wednesday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Thursday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Friday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Saturday', start: '08:00', end: '18:00', enabled: false },
      { name: 'Sunday', start: '08:00', end: '18:00', enabled: false }
    ]);

    const editing = ref(false);

    const schema = yup.object({
      start1: yup.string().required(),
      end1: yup.string().required(),
      enabled1: yup.string(),

      start2: yup.string().required(),
      end2: yup.string().required(),
      enabled2: yup.string(),

      start3: yup.string().required(),
      end3: yup.string().required(),
      enabled3: yup.string(),

      start4: yup.string().required(),
      end4: yup.string().required(),
      enabled4: yup.string(),

      start5: yup.string().required(),
      end5: yup.string().required(),
      enabled5: yup.string(),

      start6: yup.string().required(),
      end6: yup.string().required(),
      enabled6: yup.string(),

      start7: yup.string().required(),
      end7: yup.string().required(),
      enabled7: yup.string()
    });

    const toast = useToast();

    const handleEditing = () => {
      editing.value = !editing.value;
    };

    const handleAvailability = (values: AvailibilityForm) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      const data = days.map((day, index) => {
        const currentInput = document.querySelector(
          `input[name="enabled${index + 1}"]`
        ) as HTMLInputElement;

        return {
          name: day,
          start: values[`start${index + 1}`],
          end: values[`end${index + 1}`],
          enabled: currentInput.checked
        };
      });

      availability.value = data as any;

      emit('availability-change', data);
      handleEditing();
    };

    return {
      toast,
      schema,
      updateAvailability,
      availability,
      handleEditing,
      editing,
      handleAvailability
    };
  }
});
</script>

<style lang="postcss" scoped>
.availability {
  min-width: 300px;
}

input[type='time'] {
  background-color: #272055;
  background-image: url(/images/icons/clock.svg) !important;
  background-position: 92.5% 50%;
  background-repeat: no-repeat;
  background-size: 18px 18px;
}
input[type='time']::-webkit-calendar-picker-indicator {
  opacity: 0;
}
</style>
