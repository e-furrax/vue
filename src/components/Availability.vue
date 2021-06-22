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
    <div
      v-for="day in availability"
      :key="day"
      class="p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
    >
      <div v-if="!editing" class="flex items-center justify-between">
        <span>{{ day.name }}</span>
        <span v-if="day.enabled">{{ day.start }} - {{ day.end }}</span>
        <span v-else>Not available</span>
      </div>
      <div v-else class="flex items-center justify-between">
        <input class="bg-purple-925 px-1 rounded-sm text-white" type="time" v-model="day.start" />
        <span class="mx-2">-</span>
        <input class="bg-purple-925 px-1 rounded-sm text-white" type="time" v-model="day.end" />
        <InputToggle class="ml-2" :enabled="day.enabled" />
      </div>
    </div>
    <div class="mt-2 flex items-center justify-end" v-if="editing">
      <button
        @click="handleEditing"
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
        @click="handleEditing"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputToggle from './InputToggle.vue';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';

import Loader from '@/components/Loader.vue';
import { getAvailability, updateAvailability } from '@/apollo/availability.gql';
import AvailabilityModel from '@/models/availability.model';

export default defineComponent({
  name: 'Availability',
  components: { InputToggle, Loader },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props);
    const { result, loading, error } = useQuery(getAvailability, {
      user: { id: parseInt(props.userId) }
    });
    const availability = useResult(result, null, data => data.getAvailability);
    console.log(availability);

    return {
      availability,
      loading,
      error
    };
  },
  methods: {
    handleEditing() {
      this.editing = this.editing ? false : true;
    }
  },
  data() {
    return {
      editing: false,
      week: [
        { name: 'Monday', start: '09:00', end: '22:00', enabled: true },
        { name: 'Tuesday', start: '09:00', end: '22:00', enabled: true },
        { name: 'Wednesday', start: '09:00', end: '20:30', enabled: true },
        { name: 'Thursday', start: '09:00', end: '22:00', enabled: false },
        { name: 'Friday', start: '09:00', end: '22:00', enabled: true },
        { name: 'Saturday', start: '11:00', end: '00:00', enabled: true },
        { name: 'Sunday', start: '11:00', end: '00:00', enabled: false }
      ]
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
