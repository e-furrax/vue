<template>
  <div class="availability">
    <div
      v-for="day in week"
      :key="day"
      class="flex items-center justify-between p-2 bg-opacity-70 bg-purple-1100 even:bg-purple-1200"
    >
      <span>{{ day.name }}</span>
      <span v-if="day.dayOff">Not available</span>
      <span v-else>{{ day.start }} - {{ day.end }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Availability',
  props: {},
  data() {
    return {
      week: [
        { name: 'Monday', start: '9:00am', end: '10:00pm', dayOff: false },
        { name: 'Tuesday', start: '9:00am', end: '10:00pm', dayOff: false },
        { name: 'Wednesday', start: '9:00am', end: '08:30pm', dayOff: false },
        { name: 'Thursday', start: '9:00am', end: '10:00pm', dayOff: true },
        { name: 'Friday', start: '9:00am', end: '10:00pm', dayOff: false },
        { name: 'Saturday', start: '11:00am', end: '12:00pm', dayOff: false },
        { name: 'Sunday', start: '11:00am', end: '12:00pm', dayOff: true }
      ]
    };
  }
});
</script>

<style lang="postcss" scoped>
.availability {
  min-width: 300px;
}
</style>
