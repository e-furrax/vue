<template>
  <Loader class="relative" v-if="loading" />
  <div v-else class="availability relative">
    <img
      src="/images/icons/edit.svg"
      class="absolute right-0 cursor-pointer"
      style="top: -2rem"
      width="20"
      @click="handleEditing"
      v-if="!editing"
    />
    <div v-show="!editing">
      <div
        v-for="day in computedAvailabilityValue"
        :key="day"
        class="p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
      >
        <div class="flex items-center justify-between">
          <span>{{ day.name }}</span>
          <span v-if="day.enabled">{{ day.start }} - {{ day.end }}</span>
          <span v-else>Not available</span>
        </div>
      </div>
    </div>
    <Form :validation-schema="schema" @submit="handleAvailability">
      <div
        v-for="(day, index) in computedAvailabilityValue"
        :key="index"
        class="flex p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
      >
        <Field
          class="bg-purple-925 px-1 rounded-sm text-white"
          :name="`start${index + 1}`"
          type="time"
          v-model="day.start"
        />
        <span class="mx-2">-</span>
        <Field
          class="bg-purple-925 px-1 rounded-sm text-white"
          :name="`end${index + 1}`"
          type="time"
          v-model="day.end"
        />
        <div>
          <Field
            class="hidden"
            :name="`enabled${index + 1}`"
            type="checkbox"
            :value="day.enabled"
          />
          <InputToggle
            @click="handleToggle"
            :enabled="day.enabled"
            :name="`enabled${index + 1}`"
            :data-name="`enabled${index + 1}`"
            class="ml-2"
          />
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
import { defineComponent } from 'vue';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';

import InputToggle from './InputToggle.vue';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import { getAvailability, updateAvailabilityMutation } from '@/apollo/availability.gql';
import AvailabilityModel from '@/models/availability.model';

interface AvailibilityForm {
  start1: string;
  end1: string;
  enabled1: string;

  start2: string;
  end2: string;
  enabled2: string;

  start3: string;
  end3: string;
  enabled3: string;

  start4: string;
  end4: string;
  enabled4: string;

  start5: string;
  end5: string;
  enabled5: string;

  start6: string;
  end6: string;
  enabled6: string;

  start7: string;
  end7: string;
  enabled7: string;
}

interface UpdateAvailabilityVariables {
  value: string;
}

export default defineComponent({
  name: 'Availability',
  components: { Field, Form, InputToggle, Loader },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { result, loading, error } = useQuery(getAvailability, {
      user: { id: parseInt(props.userId) }
    });
    const availability = useResult(result, null, data => data.getAvailability);

    const { mutate: updateAvailability } = useMutation<
      Partial<AvailabilityModel>,
      UpdateAvailabilityVariables
    >(updateAvailabilityMutation);

    const schema = yup.object({
      start1: yup.string().required(),
      end1: yup.string().required(),
      enabled1: yup.string().required(),
      start2: yup.string().required(),
      end2: yup.string().required(),
      enabled2: yup.string().required(),
      start3: yup.string().required(),
      end3: yup.string().required(),
      enabled3: yup.string().required(),
      start4: yup.string().required(),
      end4: yup.string().required(),
      enabled4: yup.string().required(),
      start5: yup.string().required(),
      end5: yup.string().required(),
      enabled5: yup.string().required(),
      start6: yup.string().required(),
      end6: yup.string().required(),
      enabled6: yup.string().required(),
      start7: yup.string().required(),
      end7: yup.string().required(),
      enabled7: yup.string().required()
    });

    const toast = useToast();

    return {
      toast,
      availability,
      schema,
      loading,
      error,
      updateAvailability
    };
  },
  computed: {
    computedAvailabilityValue(): {} {
      const values = JSON.parse(this.availability.value);
      return values;
    }
  },
  methods: {
    handleToggle(event: { target: HTMLElement }) {
      if (event.target.nodeName === 'SPAN') {
        const dataName = (event.target.parentNode as HTMLElement).dataset.name;
        const associedField = document.querySelector(`input[name='${dataName}']`) as
          | HTMLElement
          | undefined;

        if (associedField) {
          associedField.click();
        }
      }
    },
    handleAvailability(values: AvailibilityForm) {
      console.log(values);
    },
    handleEditing() {
      this.editing = this.editing ? false : true;
    }
  },
  data() {
    return {
      formIndex: 1,
      editing: false
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
